import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function Chart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="datum" minTickGap={20} />
        <YAxis />
        <Tooltip />
        <Area
          type="linear"
          dataKey="aktualne_nemocnych"
          stroke="2980b9"
          fill="#2980b9"
          name="Nemocných"
        />
        <Area
          type="linear"
          dataKey="nove_pripady"
          stroke="#c0392b"
          fill="#c0392b"
          name="Nové případy"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
