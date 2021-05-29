import React from "react";
import { Alert as Al } from "@material-ui/lab";

import { useMunicipalitiesState } from "../../providers/MunicipalitiesProvider";
import { Box } from "@material-ui/core";

export default function Alert({
  message,
  severity,
  variant,
  remote = false,
  activeCasesDisclaimer = false,
}) {
  const { alertMessage } = useMunicipalitiesState();

  if (activeCasesDisclaimer) {
    message =
      "Vykazování vyléčených osob a úmrtí má určité zpoždění oproti reálnému stavu z důvodu validace a uzavírání případů krajských hygienických stanic. Z tohodo důvodu se mohou denní záznamy aktivních případů zpětně výrazně měnit. K drobným změnám může zpětně docházet i v počtu nových případů.";
    severity = "warning";
  }

  if (remote) {
    message = alertMessage?.text;
    severity = alertMessage?.severity;
  }

  return alertMessage || message ? (
    <Box mx={1} my={4} textAlign="left">
      <Al severity={severity} variant={variant}>
        {message}
      </Al>
    </Box>
  ) : null;
}
