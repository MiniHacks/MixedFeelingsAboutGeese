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
  series: Array<EloPoint> | undefined;
}

const Chart: React.FC<Props> = (props: Props) => {

  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (props.series) {
      setSeries(props.series.map(d => ({x: d.date, y: d.elo})))
    }
  }, [props.series])

  const options = {
    responsive: true,
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

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: series,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
      
      /*
      ,
      {
        label: 'Dataset 2',
        data: labels.map(() => Math.random() * 1000),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      */
    ],
  };

  return <Line options={options} data={data} />;
}

export default Chart