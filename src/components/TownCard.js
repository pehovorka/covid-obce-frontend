import React, { useReducer } from "react";
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
import ShareIcon from "@material-ui/icons/Share";

import { Chart } from "./Chart";
import {
  OBEC_DETAIL_QUERY,
  convertToGraphData,
} from "../utils/municipalityUtils";
import { DateLimitSelect } from "./DateLimitSelect";
import { MunicipalityStats } from "./MunicipalityStats";
import { LoadingIndicator } from "./LoadingIndicator";
import {
  municipalityReducer,
  CHANGE_LIMIT,
} from "../utils/municipalityReducer";

export function TownCard({
  obec_nazev,
  obec_kod,
  handleClose,
  index,
  provided,
}) {
  const [state, dispatch] = useReducer(municipalityReducer, {
    displayLimit: 90,
    queryLimit: 90,
  });

  const obec = useQuery(OBEC_DETAIL_QUERY, {
    variables: { obec_kod, limit: state.queryLimit },
    fetchPolicy: "cache-first",
  });

  const handleDateLimitChange = (select) => {
    dispatch({ type: CHANGE_LIMIT, selectedLimit: select.target.value });
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
              <Grid item xs>
                <DateLimitSelect
                  limit={state.displayLimit}
                  handleDateLimitChange={handleDateLimitChange}
                />
              </Grid>
              <Grid item xs>
                <IconButton
                  aria-label="share"
                  onClick={() => alert("Kód obce: " + obec_kod)}
                >
                  <ShareIcon />
                </IconButton>
              </Grid>
              {handleClose ? (
                <Grid item xs>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleClose(index)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              ) : (
                ""
              )}
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
            <Chart
              data={convertToGraphData(obec.data.obec, state.displayLimit)}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
