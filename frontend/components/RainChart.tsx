"use client"

import { Card, AreaChart, Title } from "@tremor/react";

type HourlyData = {
  time: number[];
  precipitation_probability: number[];
};

type Props = {
  results: {
    hourly: HourlyData;
  };
};

function RainChart({ results }: Props) {
  const hourly = results.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);

  const data = hourly.map((hour, i) => ({
    time: hour,  // Keeping hour as a string
    "Rain (%)": results.hourly.precipitation_probability[i],
  }));

  const dataFormatter = (number: number) => `${number} %`;

  return (
    <Card>
      <Title>
        Chances of Rain
      </Title>
      <AreaChart 
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Rain (%)"]}
        colors={["blue"]}
        minValue={0}
        maxValue={100}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default RainChart;

