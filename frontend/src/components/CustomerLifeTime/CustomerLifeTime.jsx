import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJs, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js'
import moment from 'moment'

ChartJs.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend)

const CustomerLifeTime = () => {
  const [orderData, setOrderData] = useState([])

  const getOrderData = async () => {
    try {
      const response = await axios.get('https://datavisualization-jxqo.onrender.com/api/shopify/orders')
      setOrderData(response.data.data || [])
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetching order data:", error)
    }
  }

  useEffect(() => {
    getOrderData()
  }, [])

  // Aggregate purchase data by customer
  const getCustomerData = () => {
    const customerData = {}

    orderData.forEach((order) => {
      const customerId = order.id.low
      const date = moment(order.created_at).format('YYYY-MM')
      const amount = parseFloat(order.total_price_set.shop_money.amount)

      if (!customerData[customerId]) {
        customerData[customerId] = {
          firstPurchaseDate: date,
          totalValue: 0
        }
      }

      customerData[customerId].totalValue += amount
    })

    return customerData
  }

  // Aggregate CLV by cohort (month of first purchase)
  const aggregateCLVByCohort = () => {
    const customerData = getCustomerData()
    const cohortCLV = {}

    Object.values(customerData).forEach((customer) => {
      const firstPurchaseMonth = customer.firstPurchaseDate
      const totalValue = customer.totalValue

      if (!cohortCLV[firstPurchaseMonth]) {
        cohortCLV[firstPurchaseMonth] = 0
      }

      cohortCLV[firstPurchaseMonth] += totalValue
    })

    return cohortCLV
  }

  // Prepare data for the chart
  const cohortCLV = aggregateCLVByCohort()
  const cohorts = Object.keys(cohortCLV).sort()  // Sort cohorts by month
  const values = cohorts.map(cohort => cohortCLV[cohort])

  const chartData = {
  labels: cohorts,
  datasets: [
    {
      label: 'Customer Lifetime Value by Cohort',
      data: values,
      fill: false,
      backgroundColor: 'rgba(72, 207, 173, 0.6)', // Soft green background
      borderColor: 'rgba(72, 207, 173, 1)', // Bright green border
      borderWidth: 3,
      pointBackgroundColor: 'rgba(241, 196, 15, 1)', // Yellow points
      pointBorderColor: '#ffffff',
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: 'rgba(241, 196, 15, 1)',
      pointRadius: 6,
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
          family: 'Poppins', // Modern font
          size: 14,
          weight: '500',
          color: '#34495e', // Dark grey color
        },
      },
    },
    title: {
      display: true,
      text: 'Customer Lifetime Value by Cohort',
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
    x: {
      title: {
        display: true,
        text: 'Cohort (Month of First Purchase)',
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
        text: 'Lifetime Value (INR)',
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
        beginAtZero: true,
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

export default CustomerLifeTime
