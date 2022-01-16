import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-moment';
import { Line } from 'react-chartjs-2';
import { EloPoint } from '../models'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  series: Array<Array<EloPoint>> | undefined;
}

const Chart: React.FC<Props> = (props: Props) => {

  const [series1, setSeries1] = useState([]);
  const [series2, setSeries2] = useState([]);

  useEffect(() => {
    if (props.series) {
      setSeries1(props.series[0].map(d => ({x: Date.parse(d.date)/1000, y: d.elo})))
      setSeries2(props.series[1].map(d => ({x: Date.parse(d.date)/1000, y: d.elo})))
    }
  }, [props.series])

  const options = {
    responsive: true,
    scales: {
      x: [{
        // The axis for this scale is determined from the first letter of the id as `'x'`
        // It is recommended to specify `position` and / or `axis` explicitly.
        type: 'time',
      }]
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Your Misery',
      },
    },
  };

  //const labels = ['2010', '2011', '2012', '2013', '2020', '2021', '2022'];

  const data = {
    labels: [...new Set(series1.map(d => d.x).concat(series2.map(d => d.x)))].sort(),
    datasets: [
      {
        label: 'Dataset 1',
        data: series1,
        tension: 5,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: series2,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default Chart