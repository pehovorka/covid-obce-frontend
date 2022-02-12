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
import { Skeleton } from "@mui/material";

import { ChartTooltip } from "./ChartTooltip";
import { theme } from "../../../theme";

export default function MunicipalityCasesChart({ data }) {
  if (!data) {
    return (
      <Skeleton
        variant="rectangular"
        width="100%"
        height={300}
        animation="wave"
      />
    );
  }

  const colors = theme.palette.municipalityCasesChart;
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
          stroke={colors.activeCases}
          strokeWidth={3}
          fill={colors.activeCases}
          name="Aktivní případy"
        />
        <Bar
          stackId="casesSplit"
          dataKey="newCasesOver65"
          stroke={colors.newCasesOver65}
          fill={colors.newCasesOver65}
          name="Osoby 65+"
        />
        <Bar
          stackId="casesSplit"
          dataKey="newCasesUnder65"
          stroke={colors.newCasesUnder65}
          fill={colors.newCasesUnder65}
          name="Osoby mladší 65"
        />
        <Line
          type="linear"
          dot={false}
          strokeWidth={3}
          dataKey="newCasesAverage"
          stroke={colors.newCasesAverage}
          name="7denní průměr"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
