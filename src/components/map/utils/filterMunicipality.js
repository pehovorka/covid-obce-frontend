export const getMunicipality = (id, municipalityCasesOverview) => {
  return municipalityCasesOverview.find(
    (municipality) => municipality.id === id
  );
};
