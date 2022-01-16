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
  datasets: Array<Array<EloPoint>> | undefined;
}

const Chart: React.FC<Props> = (props: Props) => {

  const [series1, setSeries1] = useState(new Map<number, number>());
  const [series2, setSeries2] = useState(new Map<number, number>());
  const [datasets, setDatasets] = useState([])
  const [start, setStart] = useState(new Date("2010"))
  const [dayArray, setDayArray] = useState([])

  useEffect(() => {
    if (props.datasets) {
      const datasets = props.datasets.map(dataset => {
        const m = new Map<number, number>();
        dataset.forEach( point => 
          m.set(Date.parse(point.date), point.elo)
        )
        return m
      })
      console.log(datasets)
      const m1 = new Map();
      const m2 = new Map();
      props.datasets[0].forEach(d => m1.set(Date.parse(d.date), d.elo))
      props.datasets[1].forEach(d => m2.set(Date.parse(d.date), d.elo))
      setSeries1(m1);
      setSeries2(m2);

      setStart(new Date(Math.min(Date.parse(props.datasets[0][0].date), Date.parse(props.datasets[1][0].date))))
    }
  }, [props.datasets])

  useEffect(() => {
    setDayArray(getDaysArray(start, Date.now()))
  }, [start])

  const getDaysArray = (start, end) => {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};

  const datasets2 = [
      {
        label: 'Dataset 1',
        data: dayArray.map(day => series1.get(day.getTime()) || null),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
        tension: 0.3
      },
      {
        label: 'Dataset 2',
        data: dayArray.map(day => series2.get(day.getTime()) || null),
        tension: 0.3,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointRadius: 0
      },
    ];

  return <Line data={{labels: dayArray, datasets: datasets2}} />;
}

export default Chart