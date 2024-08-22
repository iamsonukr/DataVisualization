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
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
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
        text: 'Customer Lifetime Value by Cohort',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Cohort (Month of First Purchase)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Lifetime Value (INR)',
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

export default CustomerLifeTime
