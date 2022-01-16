import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  ChartOptions,
  TimeScale,
  CartesianScaleTypeRegistry,
  ScaleOptionsByType
} from 'chart.js';
import 'chartjs-adapter-moment';
import { Line } from 'react-chartjs-2';
import { EloPoint } from '../models'
import { _DeepPartialObject } from 'chart.js/types/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
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


  const scales: _DeepPartialObject<{
    [key: string]: ScaleOptionsByType<"radialLinear" | keyof CartesianScaleTypeRegistry>;
}> = {
      x: {
        'type': 'time',
      }
    };

  const options: ChartOptions = {
    scales,
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

  const getDaysArray = (start, end) => {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};

  const data = {
    labels: getDaysArray(new Date("2010-01-01"),new Date()),//[...new Set(series1.map(d => d.x).concat(series2.map(d => d.x)))].sort().map(date => new Date(date * 1000).toLocaleDateString("en-US")),
    datasets: [
      {
        label: 'Dataset 1',
        data: series1,
        tension: 0.3,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
      },
      {
        label: 'Dataset 2',
        data: series2,
        tension: 0.3,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointRadius: 0,
      },
    ],
  };

  return <Line data={data} />;
}

export default Chart