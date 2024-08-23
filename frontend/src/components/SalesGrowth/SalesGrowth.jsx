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
        borderColor: 'rgba(72, 207, 173, 1)', // Bright green border color
        backgroundColor: 'rgba(72, 207, 173, 0.4)', // Gradient effect using a lighter green
        fill: true,
        tension: 0.3, // Smooth the line
        pointBackgroundColor: 'rgba(241, 196, 15, 1)', // Yellow points
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: 'rgba(241, 196, 15, 1)',
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Poppins',
            size: 14,
            weight: '500',
            color: '#34495e', // Dark grey legend color
          },
        },
      },
      title: {
        display: true,
        text: `Sales Growth Over Time (by ${interval})`,
        font: {
          family: 'Poppins',
          size: 18,
          weight: '600',
          color: '#2c3e50', // Dark blue-grey title color
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: 'Poppins',
          size: 16,
          weight: '600',
        },
        bodyFont: {
          family: 'Poppins',
          size: 14,
        },
        xPadding: 15,
        yPadding: 15,
        cornerRadius: 10,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            family: 'Poppins',
            size: 14,
            weight: '500',
            color: '#34495e',
          },
        },
        grid: {
          color: 'rgba(39, 174, 96, 0.2)', // Light green grid lines
        },
        ticks: {
          font: {
            family: 'Poppins',
            size: 12,
            color: '#2c3e50', // Dark blue-grey ticks
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cumulative Sales (INR)',
          font: {
            family: 'Poppins',
            size: 14,
            weight: '500',
            color: '#34495e',
          },
        },
        beginAtZero: true,
        grid: {
          color: 'rgba(39, 174, 96, 0.2)', // Light green grid lines
        },
        ticks: {
          font: {
            family: 'Poppins',
            size: 12,
            color: '#2c3e50', // Dark blue-grey ticks
          },
        },
      },
    },
  };
  

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}

export default SalesGrowth
