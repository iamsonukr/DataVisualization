import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import moment from 'moment'

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const CustomerGrowth = () => {
  const [customerData, setCustomerData] = useState([])

  const getCustomerData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/shopify/customers')
      setCustomerData(response.data.data || [])
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetching customer data:", error)
    }
  }

  useEffect(() => {
    getCustomerData()
  }, [])

  // Aggregate customer data by the chosen interval
  const aggregateCustomerData = (interval) => {
    const customerCounts = {}

    customerData.forEach((customer) => {
      const date = moment(customer.created_at).startOf(interval).format('YYYY-MM-DD')
      if (customerCounts[date]) {
        customerCounts[date] += 1
      } else {
        customerCounts[date] = 1
      }
    })

    return customerCounts
  }

  // Choose the interval for aggregation (e.g., day, month, year)
  const interval = 'month' // Change to 'day', 'quarter', 'year' as needed
  const customerCounts = aggregateCustomerData(interval)

  // Prepare data for the chart
  const dates = Object.keys(customerCounts)
  const counts = Object.values(customerCounts)

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'New Customers Added',
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
        text: `New Customers Added Over Time (by ${interval})`,
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
          text: 'Number of New Customers',
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

export default CustomerGrowth
