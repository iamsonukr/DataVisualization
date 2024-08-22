import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import moment from 'moment'

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const RepeatCustomers = () => {
  const [orderData, setOrderData] = useState([])

  const getOrderData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/shopify/customers')
      setOrderData(response.data.data || [])
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetching order data:", error)
    }
  }

  useEffect(() => {
    getOrderData()
  }, [])

  // Aggregate purchase counts by customer
  const getCustomerPurchaseCounts = () => {
    const customerPurchases = {}

    orderData.forEach((order) => {
      const customerId = order.id.low  // Assuming 'id.low' is unique for each customer
      if (customerPurchases[customerId]) {
        customerPurchases[customerId].push(order.created_at)
      } else {
        customerPurchases[customerId] = [order.created_at]
      }
    })

    return customerPurchases
  }

  // Filter customers with more than one purchase
  const getRepeatCustomers = (customerPurchases) => {
    const repeatCustomers = {}
    Object.values(customerPurchases).forEach((purchases) => {
      if (purchases.length > 1) {
        purchases.forEach((date) => {
          const formattedDate = moment(date).startOf('month').format('YYYY-MM-DD')
          repeatCustomers[formattedDate] = (repeatCustomers[formattedDate] || 0) + 1
        })
      }
    })

    return repeatCustomers
  }

  // Aggregate repeat customer data by time frame
  const aggregateRepeatCustomers = (interval) => {
    const customerPurchases = getCustomerPurchaseCounts()
    const repeatCustomers = getRepeatCustomers(customerPurchases)

    const aggregatedData = {}
    Object.keys(repeatCustomers).forEach(date => {
      const intervalDate = moment(date).startOf(interval).format('YYYY-MM-DD')
      aggregatedData[intervalDate] = (aggregatedData[intervalDate] || 0) + repeatCustomers[date]
    })

    return aggregatedData
  }

  // Choose the interval for aggregation (e.g., day, month, quarter, year)
  const interval = 'month'  // Change to 'day', 'quarter', 'year' as needed
  const repeatCustomerCounts = aggregateRepeatCustomers(interval)

  // Prepare data for the chart
  const dates = Object.keys(repeatCustomerCounts)
  const counts = Object.values(repeatCustomerCounts)

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Number of Repeat Customers',
        data: counts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
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
        text: `Number of Repeat Customers Over Time (by ${interval})`,
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
          text: 'Number of Repeat Customers',
        },
        beginAtZero: true,
      },
    },
  }

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  )
}

export default RepeatCustomers
