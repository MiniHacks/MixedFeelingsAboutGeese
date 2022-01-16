import React, { useEffect, useState, useRef } from "react";
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
  ScaleOptionsByType,
} from "chart.js";
import isDeepEqual from 'fast-deep-equal/react'
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";
import { EloPoint, Team } from "../models";
import { _DeepPartialObject } from "chart.js/types/utils";

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
  datasets: Array<Team> | undefined;
}

const Chart: React.FC<Props> = (props: Props) => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const datasetsRef = useRef(props.datasets)

  if (!isDeepEqual(datasetsRef.current, props.datasets)) { 
    datasetsRef.current = props.datasets
  }

  useEffect(() => {
    // @ts-ignore
    ChartJS.defaults.animation.duration = 0
    if (props.datasets) {
      const start = Math.min(
        ...props.datasets.map((dataset) =>
          Date.parse(dataset.elo_history[0].date)
        )
      );
      const dayArray = getDaysArray(start, Date.now());

      const sets = props.datasets.map((dataset) => {
        const m = new Map<number, number>();
        dataset.elo_history.forEach((point) =>
          m.set(Date.parse(point.date), point.elo)
        );

        const hue = 360 * Math.random();
        return {
          label: dataset.name,
          data: dayArray.map((day) => m.get(day.getTime()) || null),
          borderColor: `hsla(${~~hue},70%,70%,0.8)`,
          backgroundColor: `hsla(${~~hue},70%,70%,0.8)`,
          pointRadius: 0,
          tension: 0.7,
          borderWidth: 5,
          spanGaps: true,
        };
      });
      sets.push({
        label: "Average",
        data: dayArray.map((day) => 1400),
        borderColor: `rgb(0,0,0, 0.4)`,
        backgroundColor: `rgb(0,0,0,0.4)`,
        pointRadius: 0,
        tension: 0,
        borderWidth: 3,
        spanGaps: true,
      });
      setDatasets(sets);
      setLabels(dayArray);
      console.log(sets)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datasetsRef.current]);

  const getDaysArray = (start, end) => {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  return (
    <Line
      data={{
        labels: labels.map((label) => label.toDateString()),
        datasets: datasets,
      }}
    />
  );
};

export default Chart;
