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

export default function VaccineTypesChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey={"value"}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} opacity="100%" />
          ))}
        </Pie>
        ;
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

VaccineTypesChart.propTypes = {
  data: PropTypes.array,
};
