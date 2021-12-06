import React from "react";
import PropTypes from "prop-types";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";

import ChartTooltip from "./DoseOrderNewDosesChartTooltip";
import { getDoseOrderData } from "../orpVaccinationsUtils";

export default function DoseOrderNewDosesChart({ data }) {
  const colors = ["#0078B8", "#E67145", "#22D083", "#E6B617", "#2EA5E6"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
        data={data}
        margin={{
          left: 5,
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
        <YAxis yAxisId="left" domain={[0, "maxValue"]} />

        <Tooltip content={<ChartTooltip />} filterNull={false} />

        <Bar
          stackId="newDosesSplit"
          dataKey={(day) => getDoseOrderData(day, 1).nd}
          fill={colors[0]}
          name="dose1ND"
          yAxisId="left"
        />
        <Bar
          stackId="newDosesSplit"
          dataKey={(day) => getDoseOrderData(day, 2).nd}
          fill={colors[1]}
          name="dose2ND"
          yAxisId="left"
        />
        <Bar
          stackId="newDosesSplit"
          dataKey={(day) => getDoseOrderData(day, 3).nd}
          fill={colors[2]}
          name="dose3ND"
          yAxisId="left"
        />
        {}
        <Line
          type="linear"
          dot={false}
          strokeWidth={3}
          dataKey="newDosesAverage"
          stroke="#888888"
          name="7denní průměr"
          yAxisId="left"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

DoseOrderNewDosesChart.propTypes = {
  data: PropTypes.array,
};
