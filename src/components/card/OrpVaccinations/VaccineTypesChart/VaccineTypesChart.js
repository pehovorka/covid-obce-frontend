import React from "react";
import PropTypes from "prop-types";
import {
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
} from "recharts";
import { formatNumberToDisplay } from "../../../../utils/municipalityUtils";
import { theme } from "../../../../theme";

export default function VaccineTypesChart({ data }) {
  const colors = theme.palette.orpVaccinations;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey={"value"}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} opacity="100%" />
          ))}
        </Pie>
        ;
        <Legend
          verticalAlign="middle"
          align="right"
          layout="vertical"
          wrapperStyle={{ width: "40%" }}
        />
        <Tooltip formatter={formatNumberToDisplay} />
      </PieChart>
    </ResponsiveContainer>
  );
}

VaccineTypesChart.propTypes = {
  data: PropTypes.array,
};
