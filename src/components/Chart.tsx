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

  const [series1, setSeries1] = useState(new Map<number, number>());
  const [series2, setSeries2] = useState(new Map<number, number>());
  const [start, setStart] = useState(new Date("2010"))

  useEffect(() => {
    if (props.series) {
      const m1 = new Map();
      const m2 = new Map();
      console.log(props.series[0].map(l => l.date))
      props.series[0].forEach(d => m1.set(Date.parse(d.date), d.elo))
      props.series[1].forEach(d => m2.set(Date.parse(d.date), d.elo))
      setSeries1(m1);
      setSeries2(m2);
    }
  }, [props.series])


  const scales: _DeepPartialObject<{
    [key: string]: ScaleOptionsByType<"radialLinear" | keyof CartesianScaleTypeRegistry>;
}> = {
      x: {
        'type': 'time',
        'time': { unit: 'day' }
      }
    };

  const options: ChartOptions = {
    scales,
  };

  const getDaysArray = (start, end) => {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};

  const days: Array<Date> = getDaysArray(new Date("2010/01/01"),new Date());

  console.log(days)
  const data = {
    labels: days,//[...new Set(series1.map(d => d.x).concat(series2.map(d => d.x)))].sort().map(date => new Date(date * 1000).toLocaleDateString("en-US")),
    datasets: [
      {
        label: 'Dataset 1',
        data: days.map(day => series1.get(day.getTime()) || null),
        tension: 0.3,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
      },
      {
        label: 'Dataset 2',
        data: days.map(day => series2.get(day.getTime()) || null),
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