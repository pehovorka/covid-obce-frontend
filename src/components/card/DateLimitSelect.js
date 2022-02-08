import React from "react";
import { FormControl, MenuItem, Select, Tooltip } from "@mui/material/";

export default function DateLimitSelect({
  limit,
  handleDateLimitChange,
  code,
}) {
  return (
    <Tooltip title="Počet dní v grafu" placement="left">
      <FormControl>
        <Select
          labelId="date-limit-select-label"
          id="date-limit-select"
          value={limit}
          variant="standard"
          onChange={(select) => handleDateLimitChange({ select, code })}
        >
          <MenuItem value={7}>7 dní</MenuItem>
          <MenuItem value={30}>30 dní</MenuItem>
          <MenuItem value={90}>90 dní</MenuItem>
          <MenuItem value={0}>Vše</MenuItem>
        </Select>
      </FormControl>
    </Tooltip>
  );
}
