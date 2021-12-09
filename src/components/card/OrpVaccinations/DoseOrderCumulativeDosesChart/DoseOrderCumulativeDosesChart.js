import React from "react";
import PropTypes from "prop-types";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import ChartTooltip from "./DoseOrderCumulativeDosesChartTooltip";
import { getDoseOrderData } from "../orpVaccinationsUtils";
import { theme } from "../../../../theme";
import { numberToString } from "../../../../utils/general";

export default function DoseOrderCumulativeDosesChart({ data, population }) {
  const colors = theme.palette.orpVaccinations;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
        data={data}
        margin={{
          right: -20,
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
        <YAxis
          yAxisId="right"
          orientation="right"
          type="number"
          scale="linear"
          unit="%"
          tickFormatter={numberToString(this, 0)}
          domain={[0, "maxValue"]}
        />
        <Tooltip content={<ChartTooltip />} />

        <Area
          type="linear"
          dataKey={(day) => getDoseOrderData(day, 1).td}
          name={"dose1TD"}
          fill={colors[0]}
          stroke={colors[0]}
          strokeWidth={3}
          yAxisId="left"
        />
        <Line
          type="linear"
          dataKey={(day) => (getDoseOrderData(day, 1).td / population) * 100}
          name="dose1TDRelative"
          yAxisId="right"
          dot={false}
          strokeWidth={0}
          unit="%"
        />
        <Area
          type="linear"
          dataKey={(day) => getDoseOrderData(day, 2).td}
          name={"dose2TD"}
          fill={colors[1]}
          stroke={colors[1]}
          strokeWidth={3}
          yAxisId="left"
        />
        <Line
          type="linear"
          dataKey={(day) => (getDoseOrderData(day, 2).td / population) * 100}
          name="dose2TDRelative"
          yAxisId="right"
          dot={false}
          strokeWidth={0}
        />
        <Area
          type="linear"
          dataKey={(day) => getDoseOrderData(day, 3).td}
          name={"dose3TD"}
          fill={colors[2]}
          stroke={colors[2]}
          strokeWidth={3}
          yAxisId="left"
        />
        <Line
          type="linear"
          dataKey={(day) => (getDoseOrderData(day, 3).td / population) * 100}
          name="dose3TDRelative"
          yAxisId="right"
          dot={false}
          strokeWidth={0}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

DoseOrderCumulativeDosesChart.propTypes = {
  data: PropTypes.array,
  population: PropTypes.number,
};
