import React from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core/";

export function DateLimitSelect({ limit, handleDateLimitChange }) {
  return (
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
  );
}
