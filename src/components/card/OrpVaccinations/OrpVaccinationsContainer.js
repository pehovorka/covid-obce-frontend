import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { Alert, Skeleton } from "@material-ui/lab";
import { Box, Grid, Typography } from "@material-ui/core";

import DoseOrderCumulativeDosesChart from "./DoseOrderCumulativeDosesChart/DoseOrderCumulativeDosesChart";
import VaccineTypesChart from "./VaccineTypesChart/VaccineTypesChart";
import OrpVaccinationsBasicStats from "./OrpVaccinationsBasicStats";

import { ORP_VACCINATIONS_QUERY } from "../../../utils/queries";
import {
  convertToDoseOrderCumulativeDosesData,
  convertToDoseOrderNewDosesData,
  convertToVaccineTypes,
} from "./orpVaccinationsUtils";
import DoseOrderNewDosesChart from "./DoseOrderNewDosesChart/DoseOrderNewDosesChart";

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
    <Box px={{ xs: 0, sm: 3 }}>
      <Typography variant="h5" gutterBottom>
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
          <Typography variant="h6" gutterBottom>
            Nově vykázaná očkování dle pořadí dávky
          </Typography>
          <DoseOrderNewDosesChart
            data={convertToDoseOrderNewDosesData(orpVaccinations.days, limit)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Vykázaná očkování dle pořadí dávky kumulativně
          </Typography>
          <DoseOrderCumulativeDosesChart
            data={convertToDoseOrderCumulativeDosesData(
              orpVaccinations.days,
              limit
            )}
            population={orpVaccinations.orpPopulation}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

OrpVaccinationsContainer.propTypes = {
  orpId: PropTypes.number,
};
