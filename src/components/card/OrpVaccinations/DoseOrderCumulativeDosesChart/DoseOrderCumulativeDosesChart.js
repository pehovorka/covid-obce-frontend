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
  Legend,
} from "recharts";

import ChartTooltip from "./DoseOrderCumulativeDosesChartTooltip";
import { getDoseOrderData } from "../orpVaccinationsUtils";
import { theme } from "../../../../theme";
import { numberToString } from "../../../../utils/general";

export default function DoseOrderCumulativeDosesChart({ data, population }) {
  const colors = theme.palette.orpVaccinations;

  const NAMES = {
    dose1TD: "První dávky",
    dose2TD: "Druhé dávky",
    dose3TD: "Posilující dávky",
    dose1TDRelative: "První dávky – % populace",
    dose2TDRelative: "Druhé dávky – % populace",
    dose3TDRelative: "Posilující dávky – % populace",
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
        data={data}
        margin={{
          right: -20,
          left: 5,
          bottom: 0,
          top: 3,
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
        <Tooltip content={<ChartTooltip NAMES={NAMES} />} />

        <Area
          type="linear"
          dataKey={(day) => getDoseOrderData(day, 1).td}
          name={NAMES.dose1TD}
          fill={colors[0]}
          stroke={colors[0]}
          strokeWidth={3}
          yAxisId="left"
        />
        <Line
          dataKey={(day) => (getDoseOrderData(day, 1).td / population) * 100}
          name={NAMES.dose1TDRelative}
          yAxisId="right"
          display="none"
          activeDot={false}
          unit="%"
        />
        <Area
          dataKey={(day) => getDoseOrderData(day, 2).td}
          name={NAMES.dose2TD}
          fill={colors[1]}
          stroke={colors[1]}
          strokeWidth={3}
          yAxisId="left"
        />
        <Line
          dataKey={(day) => (getDoseOrderData(day, 2).td / population) * 100}
          name={NAMES.dose2TDRelative}
          yAxisId="right"
          display="none"
          activeDot={false}
        />
        <Area
          type="linear"
          dataKey={(day) => getDoseOrderData(day, 3).td}
          name={NAMES.dose3TD}
          fill={colors[2]}
          stroke={colors[2]}
          strokeWidth={3}
          yAxisId="left"
        />
        <Line
          dataKey={(day) => (getDoseOrderData(day, 3).td / population) * 100}
          name={NAMES.dose3TDRelative}
          yAxisId="right"
          display="none"
          activeDot={false}
        />
        <Legend
          align="left"
          payload={[
            { value: NAMES.dose1TD, type: "line", color: colors[0] },
            { value: NAMES.dose2TD, type: "line", color: colors[1] },
            { value: NAMES.dose3TD, type: "line", color: colors[2] },
          ]}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

DoseOrderCumulativeDosesChart.propTypes = {
  data: PropTypes.array,
  population: PropTypes.number,
};
