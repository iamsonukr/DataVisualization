import React from 'react'

import { Line } from 'react-chartjs-2'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'



ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)



const LineGraph = () => {

    const lineChartData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
            { label: "Steps", data: [3000, 4000, 2000, 6000, 6500, 12000, 1900], borderColor: "rgb(0, 0, 0)" },
            { label: "Steps By Sonu", data: [1000, 6000, 4000, 7000, 1000, 15000, 1000], borderColor: "rgb(110, 161, 0)" }
        ]
    }

    const options = {}
    const data = {}
    return (
        <div>
            <Line data={lineChartData} />

        </div>
    )
}

export default LineGraph