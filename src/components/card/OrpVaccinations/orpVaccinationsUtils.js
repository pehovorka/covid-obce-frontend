export const convertToDoseOrderData = (days, limit) => {
  if (!days) return null;
  const chartData = days.map((item) => {
    const container = {};
    container.date = item.date;
    container.doses = item.doses;
    return container;
  });
  return chartData.slice(-limit);
};

export const convertToVaccineTypes = (data, vaccineNames) => {
  if (!data) return null;
  const getVaccineName = (vaccineId) =>
    vaccineNames.find((vaccine) => vaccine.vaccineId === vaccineId);

  const colors = ["#0078B8", "#E67145", "#22D083", "#E6B617", "#2EA5E6"];

  const result = data.map((vaccine, index) => ({
    value: vaccine.td,
    name: getVaccineName(vaccine.v).vaccineName,
    color: colors[index],
  }));
  return result;
};

export const getDoseOrderData = (day, doseOrder) => {
  return day.doses.find((dose) => dose.o === doseOrder);
};
