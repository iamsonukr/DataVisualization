import { useState } from 'react'
import './Dashboard.css'

import SalesGrowth from '../../components/SalesGrowth/SalesGrowth'
import CustomerGrowth from '../../components/CustomerGrowth/CustomerGrowth'
import RepeatCustomers from '../../components/RepeatedCustomers/RepeatedCustomers'
import CustomerLifeTime from '../../components/CustomerLifeTime/CustomerLifeTime'
import CustomersGeography from '../../components/CustomersGeography/CustomersDash'
import TotalSalesOverTime from '../../components/TotalSalesOverTime/OrdersDash'

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="chart-card">
        <div className="chart-title">Total Sales Over Time</div>
        <div className="chart-container">
          <TotalSalesOverTime className="chart" />
        </div>
      </div>
      <div className="chart-card">
        <div className="chart-title">Sales Growth</div>
        <div className="chart-container">
          <SalesGrowth className="chart" />
        </div>
      </div>
      <div className="chart-card">
        <div className="chart-title">Customer Growth</div>
        <div className="chart-container">
          <CustomerGrowth className="chart" />
        </div>
      </div>
      <div className="chart-card">
        <div className="chart-title">Repeat Customers</div>
        <div className="chart-container">
          <RepeatCustomers className="chart" />
        </div>
      </div>
      <div className="chart-card">
        <div className="chart-title">Customers Geography</div>
        <div className="chart-container">
          <CustomersGeography className="chart" />
        </div>
      </div>
      <div className="chart-card">
        <div className="chart-title">Customer Lifetime Value</div>
        <div className="chart-container">
          <CustomerLifeTime className="chart" />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
