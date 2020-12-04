import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Grid,
} from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";

import { Chart } from "./Chart";
import {
  OBEC_DETAIL_QUERY,
  convertToGraphData,
} from "../utils/municipalityUtils";
import { DateLimitSelect } from "./DateLimitSelect";
import { MunicipalityStats } from "./MunicipalityStats";
import { LoadingIndicator } from "./LoadingIndicator";

export function TownCard({
  obec_nazev,
  obec_kod,
  handleClose,
  index,
  provided,
}) {
  const [limit, setLimit] = useState(90);
  const [queryLimit, setQueryLimit] = useState(90);
  const obec = useQuery(OBEC_DETAIL_QUERY, {
    variables: { obec_kod, limit: queryLimit },
    fetchPolicy: "cache-first",
  });

  const handleDateLimitChange = (result) => {
    setLimit(result.target.value);
    if (result.target.value === 0) {
      setQueryLimit(0);
    }
  };

  return (
    <Card>
      <CardHeader
        {...provided?.dragHandleProps}
        action={
          <Box>
            <Grid
              container
              alignItems="center"
              justify="flex-end"
              spacing={1}
              direction="row"
            >
              <Grid item xs={7}>
                <DateLimitSelect
                  limit={limit}
                  handleDateLimitChange={handleDateLimitChange}
                />
              </Grid>
              <Grid item xs={5}>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleClose(index)}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        }
        title={obec_nazev}
      />
      <CardContent>
        {obec.loading || obec.error ? (
          <LoadingIndicator />
        ) : (
          <>
            <MunicipalityStats obec={obec} obec_kod={obec_kod} />
            <Chart data={convertToGraphData(obec.data.obec, limit)} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
