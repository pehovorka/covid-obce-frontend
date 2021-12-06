import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { Alert, Skeleton } from "@material-ui/lab";
import { Box, Grid, Typography } from "@material-ui/core";

import { ORP_VACCINATIONS_QUERY } from "../../../utils/queries";

import DoseOrderNewDosesChartContainer from "./DoseOrderNewDosesChart/DoseOrderNewDosesChartContainer";
import DoseOrderCumulativeDosesChartContainer from "./DoseOrderCumulativeDosesChart/DoseOrderCumulativeDosesChartContainer";
import OrpVaccinationsBasicStatsContainer from "./BasicStats/OrpVaccinationsBasicStatsContainer";
import VaccineTypesChartContainer from "./VaccineTypesChart/VaccineTypesChartContainer";

export default function OrpVaccinationsContainer({ orpId }) {
  const orp = useQuery(ORP_VACCINATIONS_QUERY, {
    variables: { orpId: orpId, limit: 0 },
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
    <Box px={{ xs: 0, sm: 3 }}>
      <Typography variant="h5" gutterBottom>
        Základní přehled k {new Date(lastDay.date).toLocaleDateString("cs-CZ")}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <OrpVaccinationsBasicStatsContainer
            lastDay={lastDay}
            orpPopulation={orpVaccinations.orpPopulation}
            orpName={orpVaccinations.orpName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <VaccineTypesChartContainer
            vaccines={lastDay.vaccines}
            vaccineNames={orpVaccinations.vaccineNames}
          />
        </Grid>
        <Grid item xs={12}>
          <DoseOrderNewDosesChartContainer data={orpVaccinations.days} />
        </Grid>
        <Grid item xs={12}>
          <DoseOrderCumulativeDosesChartContainer
            data={orpVaccinations.days}
            population={orpVaccinations.population}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

OrpVaccinationsContainer.propTypes = {
  orpId: PropTypes.number,
};
