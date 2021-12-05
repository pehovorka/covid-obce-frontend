import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { Alert, Skeleton } from "@material-ui/lab";
import { Grid, Typography } from "@material-ui/core";

import DoseOrderChart from "./DoseOrderChart/DoseOrderChart";
import VaccineTypesChart from "./VaccineTypesChart/VaccineTypesChart";
import OrpVaccinationsBasicStats from "./OrpVaccinationsBasicStats";

import { ORP_VACCINATIONS_QUERY } from "../../../utils/queries";
import {
  convertToDoseOrderData,
  convertToVaccineTypes,
} from "./orpVaccinationsUtils";

export default function OrpVaccinationsContainer({ orpId }) {
  const [limit] = useState(0);

  const orp = useQuery(ORP_VACCINATIONS_QUERY, {
    variables: { orpId: orpId, limit: limit === 0 ? 0 : 90 },
    fetchPolicy: "cache-first",
  });

  if (orp.loading && !orp.data) {
    return <Skeleton animation="wave" />;
  }
  if (orp.error) {
    return (
      <Alert severity="error">
        Chyba při načítání dat. Zkuste to prosím znovu později.
      </Alert>
    );
  }

  const orpVaccinations = orp.data.orpVaccinations;
  const lastDay = orpVaccinations.days[orpVaccinations.days.length - 1];

  return (
    <>
      <Typography variant="h5">
        Základní přehled k {new Date(lastDay.date).toLocaleDateString("cs-CZ")}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">
            Vykázaná očkování dle pořadí dávky
          </Typography>
          <OrpVaccinationsBasicStats
            lastDay={lastDay}
            orpPopulation={orpVaccinations.orpPopulation}
            orpName={orpVaccinations.orpName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">
            Rozdělení dle typu očkovací látky
          </Typography>
          <VaccineTypesChart
            data={convertToVaccineTypes(
              lastDay.vaccines,
              orpVaccinations.vaccineNames
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Vykázaná očkování dle pořadí dávky kumulativně
          </Typography>
          <DoseOrderChart
            data={convertToDoseOrderData(orpVaccinations.days, limit)}
            population={orpVaccinations.orpPopulation}
          />
        </Grid>
      </Grid>
    </>
  );
}

OrpVaccinationsContainer.propTypes = {
  orpId: PropTypes.number,
};
