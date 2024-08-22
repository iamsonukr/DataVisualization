import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const CustomersGeography = () => {
  const [customerData, setCustomerData] = useState([])

  const getCustomerData = async () => {
    try {
      const response = await axios.get('https://datavisualization-jxqo.onrender.com/api/shopify/customers')
      setCustomerData(response.data.data || [])
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetching customer data:", error)
    }
  }

  useEffect(() => {
    getCustomerData()
  }, [])

  // Aggregate customer data by city
  const cityCounts = customerData.reduce((acc, customer) => {
    const city = customer.default_address?.city || 'Unknown'
    acc[city] = (acc[city] || 0) + 1
    return acc
  }, {})

  // Prepare data for the chart
  const cities = Object.keys(cityCounts)
  const counts = Object.values(cityCounts)

  const chartData = {
    labels: cities,
    datasets: [
      {
        label: 'Number of Customers by City',
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
        text: 'Customer Distribution by City',
      },
    },
  }

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  )
}

export default CustomersGeography
