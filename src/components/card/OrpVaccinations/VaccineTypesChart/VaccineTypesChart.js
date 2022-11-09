import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import {
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
} from "recharts";
import VaccineTypesChartTooltip from "./VaccineTypesChartTooltip";

export default function VaccineTypesChart({ data }) {
  const theme = useTheme();
  const colors = theme.palette.orpVaccinations;
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie data={data} dataKey={"value"}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} opacity="100%" />
          ))}
        </Pie>
        {/* TODO: keep an eye on https://github.com/recharts/recharts/issues/2704 
        and then update ReCharts after the issue is fixed. */}
        {isDesktop ? (
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            wrapperStyle={{ width: "40%" }}
          />
        ) : (
          <Legend align="left" />
        )}

        <Tooltip content={<VaccineTypesChartTooltip data={data} />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

VaccineTypesChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
