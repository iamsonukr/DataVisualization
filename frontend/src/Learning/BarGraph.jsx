import React from 'react'

// 1> import type of chart you want in your project it could be Bar, Pie , Line etc from react-chartjs-2
import { Bar } from 'react-chartjs-2'

// 2> import all the necessary chart elements from the chart.js
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend } from 'chart.js'


// 3> Register the elements you are going to use in the Chart
ChartJs.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend)

const BarGraph = () => {

    // 4> Your chart data should be in this structure only . Changing the spelling will affect the the chart
    const barChartData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
            { label: "Steps", data: [18000, 4000, 2000, 6000, 19500, 12000, 1900], borderColor: "rgb(203, 216, 50)",backgroundColor:'white' },
            { label: "Steps By Sonu", data: [1000, 6000, 4000, 7000, 1000, 15000, 1000], borderColor: "rgb(10, 6, 240)" , backgroundColor:['red','yellow'],borderWidth:1, }


            //you can also give array of bgcolor to set multiple bar colors
            // { label: "Steps By Sonu", data: [1000, 6000, 4000, 7000, 1000, 15000, 1000], borderColor: "rgb(10, 6, 240)" , backgroundColor:['red','yellow'],borderWidth:1, }
        ]
    }

    // 5> Set optionData
    const optionData={
        responsive:true,
        plugins:{
            legend:{
                position:"bottom"
            },
            title:{
                display:true,
                text:"this is a chart representing my daily steps"
            }
        }
    }
     
  return (
    <div>
        {/* 5> Create the element for the Chart */}
        {/* The element has two attributes for Chart making , data=> to put the entire object of the data , Options => To cusomize the chart elements like title etc */}
        <Bar options={optionData} data={barChartData} />
    </div>
  )
}

export default BarGraph