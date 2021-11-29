import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { useQuery } from "@apollo/client";

import { MUNICIPALITY_CASES_METADATA } from "../../../utils/queries";

export default function LastModified() {
  const metadataResult = useQuery(MUNICIPALITY_CASES_METADATA, {});
  const [updatedAtDates, setUpdatedAtDates] = useState();

  useEffect(() => {
    metadataResult.data &&
      setUpdatedAtDates({
        sourceUpdatedAt: new Date(
          parseInt(
            metadataResult.data?.municipalityCasesMetadata?.sourceUpdatedAt
          )
        ),
        collectionUpdatedAt: new Date(
          parseInt(
            metadataResult.data?.municipalityCasesMetadata?.collectionUpdatedAt
          )
        ),
      });
  }, [metadataResult.data]);

  return updatedAtDates ? (
    <Typography variant="caption">
      Aktualizace zdrojových dat:{" "}
      {updatedAtDates.sourceUpdatedAt.toLocaleString("cs-CZ", {
        dateStyle: "medium",
        timeStyle: "short",
      })}
      <br />
      Import dat:{" "}
      {updatedAtDates.collectionUpdatedAt.toLocaleString("cs-CZ", {
        dateStyle: "medium",
        timeStyle: "short",
      })}
    </Typography>
  ) : null;
}
