import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { useQuery, gql } from "@apollo/client";

const LAST_MODIFIED_QUERY = gql`
  query lastModified {
    lastModified {
      last_modified
    }
  }
`;

export function LastModified() {
  const lastModified = useQuery(LAST_MODIFIED_QUERY, {});
  const [lastModifiedDate, setLastModifiedDate] = useState();

  useEffect(() => {
    lastModified.data &&
      setLastModifiedDate(
        new Date(parseInt(lastModified.data?.lastModified?.last_modified))
      );
  }, [lastModified.data]);

  return lastModifiedDate ? (
    <Typography variant="caption">
      Poslední aktualizace dat:{" "}
      {lastModifiedDate.toLocaleString("cs-CZ", {
        dateStyle: "medium",
        timeStyle: "short",
      })}
    </Typography>
  ) : null;
}
