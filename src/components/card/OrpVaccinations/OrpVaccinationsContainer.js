import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { Alert, Box, Grid, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { route } from "../../../Routes";

import { ORP_VACCINATIONS_QUERY } from "../../../utils/queries";

import DoseOrderNewDosesChartContainer from "./DoseOrderNewDosesChart/DoseOrderNewDosesChartContainer";
import DoseOrderCumulativeDosesChartContainer from "./DoseOrderCumulativeDosesChart/DoseOrderCumulativeDosesChartContainer";
import OrpVaccinationsBasicStatsContainer from "./BasicStats/OrpVaccinationsBasicStatsContainer";
import VaccineTypesChartContainer from "./VaccineTypesChart/VaccineTypesChartContainer";

export default function OrpVaccinationsContainer({
  orpId,
  municipalityName,
  municipalityPopulation,
  setOrpLoading,
}) {
  const orp = useQuery(ORP_VACCINATIONS_QUERY, {
    variables: { orpId: orpId, limit: 0 },
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    setOrpLoading(orp.loading);
  }, [orp.loading, setOrpLoading]);

  if (orp.loading && !orp.data) {
    return null;
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
    <Box px={{ xs: 2, sm: 5 }} py={2}>
      <Typography variant="h5" gutterBottom>
        Základní přehled k {new Date(lastDay.date).toLocaleDateString("cs-CZ")}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <OrpVaccinationsBasicStatsContainer
            lastDay={lastDay}
            orpPopulation={orpVaccinations.orpPopulation}
            orpName={orpVaccinations.orpName}
            municipalityName={municipalityName}
            municipalityPopulation={municipalityPopulation}
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
            orpPopulation={orpVaccinations.orpPopulation}
          />
        </Grid>
        <Grid item xs={12}>
          <Alert severity="info">
            Data o očkování nejsou k dispozici na úrovni jednotlivých obcí.
            Zobrazená data se vztahují ke správnímu obvodu obce s rozšířenou
            působností, do kterého vámi vyhledaná obec spadá. Více informací lze
            nalézt na{" "}
            <Link component={RouterLink} to={route.info} underline="hover">
              stránce s popisem dat
            </Link>
            .
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
}

OrpVaccinationsContainer.propTypes = {
  orpId: PropTypes.number,
  municipalityName: PropTypes.string,
  municipalityPopulation: PropTypes.number,
  setOrpLoading: PropTypes.func,
};
