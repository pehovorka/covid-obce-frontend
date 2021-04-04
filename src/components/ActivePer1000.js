import { Skeleton } from "@material-ui/lab";

import municipalitiesPopulation from "../assets/municipalitiesPopulation.json";

export default function ActivePer1000({
  activeCases,
  municipalityCode,
  skeletonWidth,
}) {
  if (isNaN(activeCases)) {
    return <Skeleton width={skeletonWidth} />;
  }
  const cases = (
    (activeCases / municipalitiesPopulation[0][municipalityCode]) *
    1000
  ).toLocaleString("cs-CZ", { maximumFractionDigits: 1 });
  return cases;
}
