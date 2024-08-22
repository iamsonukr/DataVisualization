import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import moment from 'moment'

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const SalesGrowth = () => {
  const [orderData, setOrderData] = useState([])

  const getOrderData = async () => {
    try {
      const response = await axios.get('https://datavisualization-jxqo.onrender.com/api/shopify/orders')
      console.log('API Response:', response.data.data)
      setOrderData(response.data.data || [])
    } catch (error) {
      console.error("Error fetching order data:", error)
    }
  }

  useEffect(() => {
    getOrderData()
  }, [])

  // Aggregate and compute cumulative sales data by the chosen interval
  const aggregateSalesData = (interval) => {
    const salesData = {}

    orderData.forEach((order) => {
      const date = moment(order.created_at).startOf(interval).format('YYYY-MM-DD')
      const amount = parseFloat(order?.total_price_set?.shop_money?.amount || 0)

      if (salesData[date]) {
        salesData[date] += amount
      } else {
        salesData[date] = amount
      }
    })

    // Compute cumulative sales
    const cumulativeSales = []
    let cumulativeTotal = 0
    Object.keys(salesData).sort().forEach(date => {
      cumulativeTotal += salesData[date]
      cumulativeSales.push({ date, total: cumulativeTotal })
    })

    return cumulativeSales
  }

  // Choose the interval for aggregation
  const interval = 'month' // Can be 'day', 'month', 'quarter', 'year'
  const salesData = aggregateSalesData(interval)

  // Prepare data for the Line chart
  const chartData = {
    labels: salesData.map(item => item.date), // Dates
    datasets: [
      {
        label: 'Cumulative Sales',
        data: salesData.map(item => item.total), // Cumulative sales amounts
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Sales Growth Over Time (by ${interval})`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cumulative Sales (INR)',
        },
        beginAtZero: true,
      },
    },
  }

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}

export default SalesGrowth
