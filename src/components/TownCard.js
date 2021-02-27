// React
import React, { useEffect } from "react";

// Apollo
import { useQuery } from "@apollo/client";

// Material UI
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Grid,
  Tooltip,
} from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";

// Sub-components
import { Chart } from "./Chart";
import {
  OBEC_DETAIL_QUERY,
  convertToGraphData,
} from "../utils/municipalityUtils";
import { DateLimitSelect } from "./DateLimitSelect";
import { MunicipalityStats } from "./MunicipalityStats";
import { LoadingIndicator } from "./LoadingIndicator";
import { ShareIconAndDialog } from "./ShareIconAndDialog";
import {
  REMOVE_MUNICIPALITY,
  SET_MESSAGE,
} from "../utils/municipalitiesReducer";
import { useMunicipalitiesDispatch } from "../providers/MunicipalitiesProvider";

export function TownCard({
  name,
  code,
  limit,
  provided,
  closeButtonHidden,
  handleDateLimitChange,
}) {
  const dispatch = useMunicipalitiesDispatch();

  const obec = useQuery(OBEC_DETAIL_QUERY, {
    variables: { obec_kod: code, limit: limit === 0 ? 0 : 90 },
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    if (name && code) {
      const item = {};
      item.item_id = code;
      item.item_name = name;
      window.gtag("event", "view_item", {
        items: [item],
      });
    }
  }, [code, name]);

  useEffect(() => {
    if (obec.error) {
      dispatch({
        type: SET_MESSAGE,
        text: "Nepodařilo se připojit k serveru. Zkuste to prosím později.",
        severity: "error",
      });
    }
  }, [obec.error, dispatch]);

  return (
    <Card>
      <CardHeader
        {...provided?.dragHandleProps}
        titleTypographyProps={{ variant: "h5", component: "h2" }}
        action={
          <Box ml={1}>
            <Grid
              container
              alignItems="center"
              justify="flex-end"
              spacing={1}
              direction="row"
              wrap="nowrap"
            >
              <Grid item xs>
                <DateLimitSelect
                  limit={limit}
                  handleDateLimitChange={handleDateLimitChange}
                  code={code}
                />
              </Grid>
              <Grid item xs>
                <ShareIconAndDialog code={code} name={name} />
              </Grid>
              {!closeButtonHidden && (
                <Grid item xs>
                  <Tooltip title="Zavřít kartu">
                    <IconButton
                      aria-label="zavřít kartu obce"
                      onClick={() =>
                        dispatch({
                          type: REMOVE_MUNICIPALITY,
                          code: code,
                        })
                      }
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              )}
            </Grid>
          </Box>
        }
        title={name}
      />
      <CardContent>
        {obec.loading || obec.error ? (
          <LoadingIndicator />
        ) : (
          <>
            <MunicipalityStats obec={obec} code={code} />
            <Chart data={convertToGraphData(obec.data.obec, limit)} />
          </>
        )}
      </CardContent>
    </Card>
  );
}

TownCard.defaultProps = {
  limit: 90,
};
