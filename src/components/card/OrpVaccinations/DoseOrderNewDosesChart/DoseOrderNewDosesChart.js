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
  Legend,
} from "recharts";

import ChartTooltip from "./DoseOrderNewDosesChartTooltip";
import { getDoseOrderData } from "../orpVaccinationsUtils";
import { theme } from "../../../../theme";

export default function DoseOrderNewDosesChart({ data }) {
  const colors = theme.palette.orpVaccinations;

  const NAMES = {
    dose1ND: "První dávky",
    dose2ND: "Druhé dávky",
    dose3ND: "1. posilující dávky",
    dose4ND: "2. posilující dávky",
    dose1NDA: "7denní průměr prvních dávek",
    dose2NDA: "7denní průměr druhých dávek",
    dose3NDA: "7denní průměr 1. posilujících dávek",
    dose4NDA: "7denní průměr 2. posilujících dávek",
    dosesAllNDA: "7denní průměr nových dávek celkem",
  };

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
        <YAxis domain={[0, "maxValue"]} />

        <Tooltip content={<ChartTooltip NAMES={NAMES} />} filterNull={false} />

        <Bar
          stackId="newDosesSplit"
          dataKey={(day) => getDoseOrderData(day, 1).nd}
          fill={colors[0]}
          name={NAMES.dose1ND}
        />
        <Bar
          stackId="newDosesSplit"
          dataKey={(day) => getDoseOrderData(day, 2).nd}
          fill={colors[1]}
          name={NAMES.dose2ND}
        />
        <Bar
          stackId="newDosesSplit"
          dataKey={(day) => getDoseOrderData(day, 3).nd}
          fill={colors[2]}
          name={NAMES.dose3ND}
        />
        <Bar
          stackId="newDosesSplit"
          dataKey={(day) => getDoseOrderData(day, 4).nd}
          fill={colors[5]}
          name={NAMES.dose4ND}
        />
        <Line
          type="linear"
          dot={false}
          strokeWidth={3}
          dataKey="newDosesAverage"
          stroke={colors[3]}
          name={NAMES.dosesAllNDA}
        />
        <Line
          display="none"
          activeDot={false}
          dataKey={(day) => getDoseOrderData(day, 1).nda}
          name={NAMES.dose1NDA}
        />
        <Line
          display="none"
          activeDot={false}
          dataKey={(day) => getDoseOrderData(day, 2).nda}
          name={NAMES.dose2NDA}
        />
        <Line
          display="none"
          activeDot={false}
          dataKey={(day) => getDoseOrderData(day, 3).nda}
          name={NAMES.dose3NDA}
        />
        <Line
          display="none"
          activeDot={false}
          dataKey={(day) => getDoseOrderData(day, 4).nda}
          name={NAMES.dose4NDA}
        />
        <Legend
          align="left"
          payload={[
            { value: NAMES.dose1ND, type: "rect", color: colors[0] },
            { value: NAMES.dose2ND, type: "rect", color: colors[1] },
            { value: NAMES.dose3ND, type: "rect", color: colors[2] },
            { value: NAMES.dose4ND, type: "line", color: colors[5] },
            { value: NAMES.dosesAllNDA, type: "line", color: colors[3] },
          ]}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

DoseOrderNewDosesChart.propTypes = {
  data: PropTypes.array,
};
