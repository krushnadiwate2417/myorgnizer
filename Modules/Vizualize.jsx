import {Line,Bar,Pie} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,Tooltip,Legend,
    BarElement,
    ArcElement
} from 'chart.js';
import UserContext from "../Context/UserContext";
import { useContext } from "react";
import {useNavigate} from 'react-router-dom'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
)


// const dataFunc = (expenseData)=>{
//     expenseData.map((val,index)=>{
//             if(i == (new Date(val.date).getMonth()-1)){
//                 dataa.push(i);
//             }
//     })
// }

const MyChart = ()=>{

    const {expenseDataGlobally} = useContext(UserContext);
    console.log(expenseDataGlobally);
    const navigate = useNavigate()

    if(expenseDataGlobally.length == 0) return;

    const dataa = {}
    const amountt = [0,0,0,0,0,0,0,0,0,0,0,0]
    console.log(expenseDataGlobally)
    expenseDataGlobally.map((val,index)=>{
        const month = new Date(val.date).getMonth()
        if(dataa[month]>=0){
            dataa[month] += val.amount
        } else{
            dataa[month] = val.amount
        }
    })
    console.log(dataa)
    
    const months = Object.keys(dataa)
    for(let i = 0; i<months.length;i++){
        amountt[months[i]] = dataa[months[i]]
    }

    console.log(amountt)

    const data = {
        labels: ["January","February","March","April","May","June","July","August","September","October","November","December"], // X-axis labels
        datasets: [
            {
            label: 'Monthwise Expenses', // Label for the chart
            data: amountt, // Data points
            borderColor: 'rgb(218, 61, 14)', // Line color
            backgroundColor: 'rgba(243, 80, 35, 0.94)', // Background color under the line
            fill: true, // Fills the area under the line
            },
        ],
    };

    const dataBar = {
        labels: ["January","February","March","April","May","June","July","August","September","October","November","December"], // X-axis labels
        datasets: [
            {
            label: 'Monthwise Expenses', // Label for the chart
            data: amountt, // Data points
            borderColor: 'rgb(14, 102, 218)', // Line color
            backgroundColor: 'rgba(243, 80, 35, 0.94)', // Background color under the line
            fill: true, // Fills the area under the line
            borderWidth : 1
            },
        ],
    }

    const dataPie = {
        labels :  ["January","February","March","April","May","June","July","August","September","October","November","December"],
        datasets :[
            {
                data : amountt,
                backgroundColor : ['red','orangered','orange','green','yellow','pink','purple','brown','green','violet','coral','tomato']
            }
        ]
       
    }
          
    const options = {
        responsive: true, // Makes the chart responsive
        plugins: {
            legend: {
            position: 'top', // Position of the legend
            },
            tooltip: {
            callbacks: {
                label: (context) => `Value: ${context.raw}`, // Custom tooltip label
            },
            },
        },
    };
    

    return(
        <>
        <div className="viz-grid">
            <div className="viz">
                <Line data={data} options={options}/>

            </div>
            <div className="viz">
                <Bar data={dataBar} options={options}/>
            </div>
            <div className="viz">
                <Pie data={dataPie} options={options}/>

            </div>
            <div className="back-btn-div">
            <button onClick={()=>{
                navigate("/home")
            }}>Back</button>
        </div>
        </div>
        </>
    )
}

export default MyChart;