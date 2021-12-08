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
