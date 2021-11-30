import React from "react";
import { useQuery } from "@apollo/client";
import { Typography } from "@material-ui/core";

import { SERVER_INFO } from "../../../utils/queries";

export default function Version() {
  const { data } = useQuery(SERVER_INFO);
  const reactAppVersion = process.env.REACT_APP_VERSION;

  return (
    <Typography variant="caption" color="textSecondary">
      Web {reactAppVersion}
      {data?.serverInfo.apiVersion && " | API " + data?.serverInfo.apiVersion}
      {data?.serverInfo.importerVersion &&
        " | Importer " + data?.serverInfo.importerVersion}
    </Typography>
  );
}
