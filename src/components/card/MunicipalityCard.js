// React
import React, { useEffect, lazy, Suspense } from "react";

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
import { Skeleton } from "@material-ui/lab";

// Sub-components
import { convertToGraphData } from "../../utils/municipalityUtils";
import { MUNICIPALITY_DETAIL_QUERY } from "../../utils/queries";
import { DateLimitSelect, MunicipalityStats, ShareIconAndDialog } from ".";
import {
  REMOVE_MUNICIPALITY,
  SET_SNACKBAR_MESSAGE,
} from "../../utils/municipalitiesReducer";
import { useMunicipalitiesDispatch } from "../../providers/MunicipalitiesProvider";

const Chart = lazy(() => import("./Chart"));

export function MunicipalityCard({
  name,
  code,
  limit,
  provided,
  closeButtonHidden,
  handleDateLimitChange,
}) {
  const dispatch = useMunicipalitiesDispatch();

  const obec = useQuery(MUNICIPALITY_DETAIL_QUERY, {
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
        type: SET_SNACKBAR_MESSAGE,
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
        <MunicipalityStats obec={obec} code={code} />
        <Suspense
          fallback={
            <Skeleton
              variant="rect"
              width="100%"
              height={300}
              animation="wave"
            />
          }
        >
          <Chart data={convertToGraphData(obec.data?.obec, limit)} />
        </Suspense>
      </CardContent>
    </Card>
  );
}

MunicipalityCard.defaultProps = {
  limit: 90,
};
