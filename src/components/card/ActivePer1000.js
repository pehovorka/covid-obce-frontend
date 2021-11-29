import PropTypes from "prop-types";

export function ActivePer1000({ activeCases, municipalityPopulation }) {
  const cases = ((activeCases / municipalityPopulation) * 1000).toLocaleString(
    "cs-CZ",
    { maximumFractionDigits: 1 }
  );
  return cases;
}

ActivePer1000.propTypes = {
  activeCases: PropTypes.number,
  municipalityPopulation: PropTypes.number,
};
