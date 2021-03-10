import React from "react";
import { Alert as Al } from "@material-ui/lab";

import { useMunicipalitiesState } from "../providers/MunicipalitiesProvider";
import { Box } from "@material-ui/core";

export function Alert() {
  const { alertMessage } = useMunicipalitiesState();

  return alertMessage ? (
    <Box mx={1} my={4}>
      <Al severity={alertMessage.severity}>{alertMessage.text}</Al>
    </Box>
  ) : null;
}
