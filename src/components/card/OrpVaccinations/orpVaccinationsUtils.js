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
  if (!data) return null;
  const getVaccineName = (vaccineId) =>
    vaccineNames.find((vaccine) => vaccine.vaccineId === vaccineId);

  const vaccineManufacturers = [
    { vaccineName: "Comirnaty", vaccineManufacturer: "Pfizer–BioNTech" },
    { vaccineName: "SPIKEVAX", vaccineManufacturer: "Moderna" },
    { vaccineName: "VAXZEVRIA", vaccineManufacturer: "AstraZeneca" },
    {
      vaccineName: "COVID-19 Vaccine Janssen",
      vaccineManufacturer: "Johnson & Johnson",
    },
  ];

  const vaccineTypes = data
    .filter((vaccine) => vaccine.td !== 0)
    .map((vaccine) => {
      const vaccineName = getVaccineName(vaccine.v).vaccineName || vaccine.v;
      const vaccineManufacturer = vaccineManufacturers.find(
        (vaccineManufacturer) => vaccineName === vaccineManufacturer.vaccineName
      )?.vaccineManufacturer;

      const result = {
        value: vaccine.td,
        name: vaccineManufacturer
          ? `${vaccineName} (${vaccineManufacturer})`
          : vaccineName,
      };

      return result;
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
