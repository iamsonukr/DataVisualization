import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Radar } from 'react-chartjs-2'
import { Chart as ChartJs, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import moment from 'moment'

ChartJs.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const CustomerGrowth = () => {
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

  const interval = 'month'
  const customerCounts = aggregateCustomerData(interval)

  const dates = Object.keys(customerCounts)
  const counts = Object.values(customerCounts)

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'New Customers Added',
        data: counts,
        backgroundColor: 'rgba(173, 207, 72, 0.4)', // Light green background
        borderColor: 'rgba(72, 207, 173, 1)', // Bright green border
        borderWidth: 3,
        pointBackgroundColor: 'rgba(241, 196, 15, 1)', // Yellow points
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: 'rgba(241, 196, 15, 1)',
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
        borderDash: [5, 5], // Adds dashed lines
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Poppins', // Modern font
            size: 14,
            weight: '500',
            color: '#34495e', // Dark grey color
          },
        },
      },
      title: {
        display: true,
        text: `New Customers Added Over Time (by ${interval})`,
        font: {
          family: 'Poppins',
          size: 18,
          weight: '600',
          color: '#2c3e50', // Dark blue-grey title
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
      r: {
        angleLines: {
          color: 'rgba(39, 174, 96, 0.2)', // Light green angle lines
        },
        grid: {
          color: 'rgba(39, 174, 96, 0.2)', // Light green grid lines
        },
        ticks: {
          backdropColor: '#ffffff',
          color: '#2c3e50', // Dark blue-grey ticks
          stepSize: 1,
        },
        suggestedMin: 0,
        suggestedMax: Math.max(...counts) + 1,
      },
    },
  }

  return (
    <div>
      <Radar data={chartData} options={chartOptions} />
    </div>
  )
}

export default CustomerGrowth
