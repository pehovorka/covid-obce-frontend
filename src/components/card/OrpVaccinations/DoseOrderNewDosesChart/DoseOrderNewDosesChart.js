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

export default function DoseOrderNewDosesChart({ data }) {
  const colors = ["#0078B8", "#E67145", "#22D083", "#E6B617", "#2EA5E6"];

  const NAMES = {
    dose1ND: "První dávky",
    dose2ND: "Druhé dávky",
    dose3ND: "Posilující dávky",
    dose1NDA: "7denní průměr prvních dávek",
    dose2NDA: "7denní průměr druhých dávek",
    dose3NDA: "7denní průměr posilujících dávek",
    dosesAllNDA: "7denní průměr dávek celkem",
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
        <Line
          type="linear"
          dot={false}
          strokeWidth={3}
          dataKey="newDosesAverage"
          stroke="#888888"
          name={NAMES.dosesAllNDA}
        />
        <Line
          display="none"
          dataKey={(day) => getDoseOrderData(day, 1).nda}
          name={NAMES.dose1NDA}
        />
        <Line
          display="none"
          dataKey={(day) => getDoseOrderData(day, 2).nda}
          name={NAMES.dose2NDA}
        />
        <Line
          display="none"
          dataKey={(day) => getDoseOrderData(day, 3).nda}
          name={NAMES.dose3NDA}
        />
        <Legend
          payload={[
            { value: NAMES.dose1ND, type: "rect", color: colors[0] },
            { value: NAMES.dose2ND, type: "rect", color: colors[1] },
            { value: NAMES.dose3ND, type: "rect", color: colors[2] },
            { value: NAMES.dosesAllNDA, type: "line", color: "#888888" },
          ]}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

DoseOrderNewDosesChart.propTypes = {
  data: PropTypes.array,
};
