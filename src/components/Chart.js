import React from "react";
import {
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@material-ui/lab";

import { ChartTooltip } from "./ChartTooltip";

export default function Chart({ data }) {
  if (!data) {
    return (
      <Skeleton variant="rect" width="100%" height={300} animation="wave" />
    );
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
        data={data}
        margin={{
          right: 20,
          left: -5,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="date"
          minTickGap={20}
          tickFormatter={(item) => {
            const date = new Date(item);
            return date.toLocaleDateString("cs-CZ");
          }}
        />
        <YAxis />
        <Tooltip
          formatter={(value) => new Intl.NumberFormat("cs").format(value)}
          separator=": "
          content={<ChartTooltip />}
          filterNull={false}
        />
        <Area
          type="linear"
          dataKey="activeCases"
          stroke="#0078B8"
          strokeWidth={3}
          fill="#0078B8"
          name="Aktivní případy"
        />
        <Bar
          stackId="casesSplit"
          dataKey="newCasesOver65"
          stroke="#ebc800"
          fill="#ebc800"
          name="Osoby 65+"
        />
        <Bar
          stackId="casesSplit"
          dataKey="newCasesUnder65"
          stroke="#b84100"
          fill="#b84100"
          name="Osoby mladší 65"
        />
        <Line
          type="linear"
          dot={false}
          strokeWidth={3}
          dataKey="newCasesAverage"
          stroke="#F27F41"
          name="7denní průměr"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
