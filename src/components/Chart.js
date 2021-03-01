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

export function Chart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="date" minTickGap={20} />
        <YAxis />
        <Tooltip
          formatter={(value) => new Intl.NumberFormat("cs").format(value)}
          separator=": "
        />
        <Area
          type="linear"
          dataKey="activeCases"
          stroke="#0078B8"
          fill="#0078B8"
          name="Aktivní případy"
        />
        <Bar
          dataKey="newCases"
          stroke="#b84100"
          fill="#b84100"
          name="Nové případy"
        />
        <Line
          type="linear"
          dot={false}
          strokeWidth={2}
          dataKey="newCasesAverage"
          stroke="#c28869"
          name="Nové případy – sedmidenní průměr"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
