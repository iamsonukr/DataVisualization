import { useEffect, useState } from 'react'
import './Dashboard.css'

import SalesGrowth from '../../components/SalesGrowth/SalesGrowth'
import CustomerGrowth from '../../components/CustomerGrowth/CustomerGrowth'
import RepeatCustomers from '../../components/RepeatedCustomers/RepeatedCustomers'
import CustomerLifeTime from '../../components/CustomerLifeTime/CustomerLifeTime'
import CustomersGeography from '../../components/CustomersGeography/CustomersDash'
import TotalSalesOverTime from '../../components/TotalSalesOverTime/OrdersDash'

const active = `
   .active {
     box-shadow: 0 8px 15px rgba(230, 176, 173, 0.5), 0 15px 25px rgba(250, 246, 135, 0.5);
     border-radius: 10px;
   }
`

function Dashboard({menu,setMenu  }) {

  useEffect(()=>{
    console.log(menu)
  },[menu])
  
  return (
    <div className="dashboard-container">
      <div className={`chart-card ${menu === 'total-sales-over-time' ? "active2" : ""}`} id='total-sales-over-time'>
        <div className="chart-title">Total Sales Over Time</div>
        <div className="chart-container" >
          <TotalSalesOverTime className="chart"  />
        </div>
      </div>
      <div className={`chart-card ${menu === 'sales-growth' ? "active2" : ""}`} id='sales-growth'>
        <div className="chart-title" >Sales Growth</div>
        <div className="chart-container" >
          <SalesGrowth className="chart" />
        </div>
      </div>
      <div className={`chart-card ${menu === 'customer-growth' ? "active2" : ""}`} id='customer-growth'>
        <div className="chart-title">Customer Growth</div>
        <div className="chart-container">
          <CustomerGrowth className="chart" />
        </div>
      </div>
      <div className={`chart-card ${menu === 'repeated-customers' ? "active2" : ""}`} id='repeated-customers'>
        <div className="chart-title">Repeat Customers</div>
        <div className="chart-container">
          <RepeatCustomers className="chart" />
        </div>
      </div>
      <div className={`chart-card ${menu === 'customer-lifetime-value' ? "active2" : ""}`} id='customer-lifetime-value'>
        <div className="chart-title">Customer Lifetime Value</div>
        <div className="chart-container">
          <CustomerLifeTime className="chart" />
        </div>
      </div>
      <div className={`chart-card ${menu === 'customer-geography' ? "active2" : ""}`} id='customer-geography' >
        <div className="chart-title">Customers Geography</div>
        <div className="chart-container" >
          <CustomersGeography className="chart" />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
