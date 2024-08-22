import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJs, Title, Tooltip, Legend,ArcElement } from 'chart.js'

ChartJs.register(ArcElement, Title, Tooltip, Legend)

const PieGraph = () => {

    const barChartData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
           
            { label: "Steps By Sonu", data: [1000, 6000, 4000, 7000, 1000, 1000, 1000] , backgroundColor:['red','yellow','pink','aqua','purple','black','green'],hoverOffset:102 }
        ]
    }
     
  return (
    <div>
        <Pie data={barChartData} />
    </div>
  )
}

export default PieGraph