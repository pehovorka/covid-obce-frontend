import municipalitiesPopulation from "../assets/municipalitiesPopulation.json";

export default function ActivePer1000({
  activeCases = 0,
  municipalityCode = 0,
}) {
  const cases = (
    (activeCases / municipalitiesPopulation[0][municipalityCode]) *
    1000
  ).toLocaleString("cs-CZ", { maximumFractionDigits: 1 });

  return cases;
}
