"use client"

import { Card, Metric, Text } from "@tremor/react";

type Props = {
    title: string;
    metric: string;
    color?: 
      | "indigo"
      | "slate"
      | "gray"
      | "zinc"
      | "neutral"
      | "stone"
      | "red"
      | "orange"
      | "amber"
      | "yellow"
      | "lime"
      | "green"
      | "emerald"
      | "teal"
      | "cyan"
      | "sky"
      | "blue"
      | "violet"
      | "purple"
      | "fuchsia"
      | "pink"
      | "rose"
      | undefined;
    
};

function StatCard({title, metric, color}: Props) {
  return (
    <Card decoration="top" decorationColor={color}>
        <Text>{title}</Text>
        <Metric>{metric}</Metric>
    </Card>
  )
}

export default StatCard;