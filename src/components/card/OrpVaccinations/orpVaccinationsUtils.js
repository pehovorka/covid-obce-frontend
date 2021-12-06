export const convertToDoseOrderCumulativeDosesData = (days, limit) => {
  if (!days) return null;
  const chartData = days.map((item) => {
    const container = {};
    container.date = item.date;
    container.doses = item.doses;
    return container;
  });
  return chartData.slice(-limit);
};

export const convertToDoseOrderNewDosesData = (days, limit) => {
  if (!days) return null;

  const sumDoses = (doses) => {
    if (!doses) return;
    let sum = 0;
    doses.map((dose) => (sum += dose.nd));
    return sum;
  };

  const chartData = days.map((item, index) => {
    const container = {};
    container.date = item.date;
    container.doses = item.doses;

    const newDosesAverage =
      (sumDoses(days[index - 3]?.doses) +
        sumDoses(days[index - 2]?.doses) +
        sumDoses(days[index - 1]?.doses) +
        sumDoses(item.doses) +
        sumDoses(days[index + 1]?.doses) +
        sumDoses(days[index + 2]?.doses) +
        sumDoses(days[index + 3]?.doses)) /
      7;

    if (!isNaN(newDosesAverage)) {
      container.newDosesAverage = newDosesAverage.toFixed(1);
    }

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
    name: getVaccineName(vaccine.v).vaccineName || vaccine.v,
    color: colors[index],
  }));
  return result;
};

export const getDoseOrderData = (day, doseOrder) => {
  return day.doses.find((dose) => dose.o === doseOrder);
};
