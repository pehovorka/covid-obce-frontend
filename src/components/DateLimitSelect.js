import React from "react";
import { FormControl, MenuItem, Select, Tooltip } from "@material-ui/core/";

export function DateLimitSelect({ limit, handleDateLimitChange }) {
  return (
    <Tooltip title="Počet dní v grafu" placement="left">
      <FormControl>
        <Select
          labelId="date-limit-select-label"
          id="date-limit-select"
          value={limit}
          onChange={handleDateLimitChange}
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
