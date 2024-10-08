import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import moment from 'moment'

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const TotalSalesOverTime = () => {
  const [orderData, setOrderData] = useState([])

  // Fetch order data from the API
  const getOrderData = async () => {
    try {
      const response = await axios.get('https://datavisualization-jxqo.onrender.com/api/shopify/orders')
      setOrderData(response.data.data || [])
    } catch (error) {
      console.error("Error fetching customer data:", error)
    }
  }

  useEffect(() => {
    getOrderData()
  }, [])

  // Aggregate sales data by the chosen interval (e.g., day, month, quarter, year)
  const aggregateSalesData = (interval) => {
    const salesData = {}

    orderData.forEach((order) => {
      console.log('Order:', order)  // Log each order to inspect its structure
      const date = moment(order.created_at).startOf(interval).format('YYYY-MM-DD')
      // const amount = parseFloat(order?.total_price_set?.shop_money?.amount || 0)
      const amount = Number(order.total_line_items_price )
      console.log("the amoint "+order.total_line_items_price)
      console.log("the amoint "+order.created_at)
      console.log('Parsed Amount:', amount)  // Log each amount to check for correctness

      if (salesData[date]) {
        salesData[date] += amount
      } else {
        salesData[date] = amount
      }
    })

    console.log("Sales Data Keys:", Object.keys(salesData))  // Log the keys (dates)
    console.log("Sales Data Values:", Object.values(salesData))  // Log the values (sales amounts)

    return salesData
  }

  // Choose the interval for aggregation (can be 'day', 'month', 'quarter', 'year')
  const interval = 'month' 
  const salesData = aggregateSalesData(interval)

  // Prepare the data and options for the Bar chart
  const chartData = {
    labels: Object.keys(salesData), // Dates
    datasets: [
      {
        label: 'Total Sales',
        data: Object.values(salesData), // Sales amounts
        backgroundColor:  'rgba(72, 207, 173, 0.9)',
        borderColor: 'rgba(72, 207, 173, 0.9)',
        borderWidth: 2,
        borderRadius: 5,
        hoverBackgroundColor: 'rgba(72, 207, 173, 0.9)',
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
            color: '#34495e',
          },
        },
      },
      title: {
        display: true,
        text: `Total Sales Over Time (by ${interval})`,
        font: {
          family: 'Poppins',
          size: 18,
          weight: '600',
          color: '#2c3e50',
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
          color: 'rgba(39, 174, 96, 0.2)', // Subtle green grid lines
        },
        ticks: {
          font: {
            family: 'Poppins',
            size: 12,
            color: '#2c3e50',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Sales (INR)',
          font: {
            family: 'Poppins',
            size: 14,
            weight: '500',
            color: '#34495e',
          },
        },
        beginAtZero: true,
        grid: {
          color: 'rgba(39, 174, 96, 0.2)', // Subtle green grid lines
        },
        ticks: {
          font: {
            family: 'Poppins',
            size: 12,
            color: '#2c3e50',
          },
        },
      },
    },
  };
  
  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  )
}

export default TotalSalesOverTime
