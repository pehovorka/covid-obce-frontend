export const convertToDoseOrderCumulativeDosesData = (days, limit) => {
  if (!days) return null;
  const chartData = days.map((day) => {
    const container = {
      date: day.date,
      doses: day.doses,
    };
    return container;
  });
  return chartData.slice(-limit);
};

export const convertToDoseOrderNewDosesData = (days, limit) => {
  if (!days) return null;

  const chartData = days.map((day, index) => {
    let averages = [];

    if (index >= 3 && index <= days.length - 4) {
      const daysToBeAveraged = days.slice(index - 3, index + 4);
      averages = getAverages(daysToBeAveraged);
    }

    const container = {
      date: day.date,
      newDosesAverage: averages.total,
      doses: day.doses.map((dose) => ({
        ...dose,
        nda: averages[dose.o],
      })),
    };

    return container;
  });

  return chartData.slice(-limit);
};

export const convertToVaccineTypes = (data, vaccineNames) => {
  const FEATURED_ITEMS_SIZE = 6;

  if (!data) return null;
  const getVaccineName = (vaccineId) =>
    vaccineNames.find((vaccine) => vaccine.vaccineId === vaccineId);

  const vaccineManufacturers = {
    Comirnaty: "Pfizer–BioNTech",
    SPIKEVAX: "Moderna",
    VAXZEVRIA: "AstraZeneca",
    "COVID-19 Vaccine Janssen": "Johnson & Johnson",
  };

  const sortedData = data
    .filter((vaccine) => vaccine.td !== 0)
    .sort((a, b) => b.td - a.td);

  const featuredItems = sortedData.slice(0, FEATURED_ITEMS_SIZE);
  const itemsToGroup = sortedData.slice(FEATURED_ITEMS_SIZE, data.length);
  const groupedTD = itemsToGroup.reduce((acc, obj) => acc + obj.td, 0);

  const baseAndGroupedItems = [
    ...featuredItems,
    { v: "Ostatní", td: groupedTD },
  ];

  const vaccineTypes = baseAndGroupedItems.map((vaccine) => {
    const vaccineName = getVaccineName(vaccine.v)?.vaccineName ?? vaccine.v;
    const vaccineManufacturer = vaccineManufacturers[vaccineName] ?? null;

    return {
      value: vaccine.td,
      name: vaccineManufacturer
        ? `${vaccineName} (${vaccineManufacturer})`
        : vaccineName,
    };
  });

  return vaccineTypes;
};

export const getDoseOrderData = (day, doseOrder) => {
  return day.doses.find((dose) => dose.o === doseOrder);
};

const getAverages = (days) => {
  let sum = {};
  days.forEach((day) => {
    let daySum = 0;
    day.doses.forEach((dose) => {
      sum[dose.o] ? (sum[dose.o] += dose.nd) : (sum[dose.o] = dose.nd);
      daySum += dose.nd;
    });
    sum.total ? (sum.total += daySum) : (sum.total = daySum);
  });

  Object.keys(sum).forEach((key) => (sum[key] = sum[key] / 7));
  return sum;
};

export const containsSecondBooster = (data) =>
  getDoseOrderData(data[data.length - 1], 4) ? true : false;
