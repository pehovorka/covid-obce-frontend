// React
import React, { useState, useEffect, lazy, Suspense } from "react";

// Apollo
import { useQuery } from "@apollo/client";

// Material UI
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  Grid,
  Tooltip,
} from "@material-ui/core/";

import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Skeleton } from "@material-ui/lab";

// PropTypes
import PropTypes from "prop-types";

// Sub-components
import { convertToGraphData } from "../../utils/municipalityUtils";
import { MUNICIPALITY_CASES_QUERY } from "../../utils/queries";
import { DateLimitSelect, MunicipalityCasesStats } from "./MunicipalityCases";
import { ShareIconAndDialog } from ".";

import {
  REMOVE_MUNICIPALITY,
  SET_SNACKBAR_MESSAGE,
} from "../../utils/municipalitiesReducer";
import { useMunicipalitiesDispatch } from "../../providers/MunicipalitiesProvider";

// Styles
import clsx from "clsx";
import { useStyles } from "./MunicipalityCard.style";
import OrpVaccinationsContainer from "./OrpVaccinations/OrpVaccinationsContainer";

const Chart = lazy(() => import("./MunicipalityCases/MunicipalityCasesChart"));

export default function MunicipalityCard({
  name,
  code,
  limit,
  provided,
  closeButtonHidden,
  handleDateLimitChange,
}) {
  const classes = useStyles();
  const dispatch = useMunicipalitiesDispatch();

  const municipality = useQuery(MUNICIPALITY_CASES_QUERY, {
    variables: { municipalityId: code, limit: limit === 0 ? 0 : 90 },
    fetchPolicy: "cache-first",
  });

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
    if (municipality.error) {
      dispatch({
        type: SET_SNACKBAR_MESSAGE,
        text: "Nepodařilo se připojit k serveru. Zkuste to prosím později.",
        severity: "error",
      });
    }
  }, [municipality.error, dispatch]);

  const districtName = municipality.data?.municipalityCases.districtName;
  const orpId = municipality.data?.municipalityCases.orpId;
  const orpName = municipality.data?.municipalityCases.orpName;

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
        subheader={
          districtName ? "Okres " + districtName : <Skeleton width="12rem" />
        }
        title={name}
      />
      <CardContent>
        <MunicipalityCasesStats municipality={municipality} code={code} />
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
          <Chart
            data={convertToGraphData(
              municipality.data?.municipalityCases.days,
              limit
            )}
          />
        </Suspense>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="flex-start">
          <Grid item>
            <Button
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="Zobrazit informace o očkování"
            >
              Informace o očkování na území ORP {orpName}
              <ExpandMoreIcon
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
              />
            </Button>
          </Grid>
        </Grid>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <OrpVaccinationsContainer orpId={orpId} />
        </CardContent>
      </Collapse>
    </Card>
  );
}

MunicipalityCard.defaultProps = {
  limit: 90,
};

MunicipalityCard.propTypes = {
  name: PropTypes.string,
  code: PropTypes.number,
  limit: PropTypes.number,
  provided: PropTypes.object,
  closeButtonHidden: PropTypes.bool,
  handleDateLimitChange: PropTypes.func,
};
