/*
LocalStorage v1:
    obce: [
        {"obec_kod":"12345", "obec_nazev": "Název obce"},
        ...
    ]

LocalStorage v2:
    municipalities: [
        {"code":"12345", "name": "Název obce", "limit": 90},
        ...
    ]
*/

// Migration
const migrateToV2 = () => {
  console.log("Storage v1 to v2 migration started...");
  const v1 = JSON.parse(localStorage.getItem("obce"));
  const v2 = v1.map((municipality) => ({
    code: municipality.obec_kod,
    name: municipality.obec_nazev,
    limit: 90,
  }));
  storeMunicipalitiesToLS(v2);
  localStorage.removeItem("obce");
  window.gtag("event", "migration", {
    success: "true",
    version: "2",
  });
  console.log("Migration finished.");
};

// Load from local storage
const loadMunicipalitiesFromLS = () => {
  const municipalities = JSON.parse(localStorage.getItem("municipalities"));
  return municipalities;
};

// Save to local storage
export const storeMunicipalitiesToLS = (municipalities) => {
  localStorage.setItem("municipalities", JSON.stringify(municipalities));
  localStorage.setItem("storageVersion", 2);
};

// Flow to get all stored municipalities
export const getMunicipalities = () => {
  if (localStorage.getItem("obce")) {
    // old v1 localStorage schema with "obce" property – migrate and then return migrated municipalities
    migrateToV2();
    return loadMunicipalitiesFromLS();
  } else if (loadMunicipalitiesFromLS()) {
    // already migrated to v2 – return saved municipalities
    return loadMunicipalitiesFromLS();
  } else {
    // no municipalities are saved in localStorage – return empty array
    return [];
  }
};
