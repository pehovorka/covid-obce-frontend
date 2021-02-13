import { isAlreadyAdded } from "../utils/municipalityUtils";

export const CHANGE_LIMIT = "CHANGE_LIMIT";
export const ADD_MUNICIPALITY = "ADD_MUNICIPALITY";

const handleDateLimitChange = (state, selectedLimit) => {
  const displayLimit = selectedLimit;
  let queryLimit = state.queryLimit;
  if (selectedLimit === 0) {
    queryLimit = 0;
  }
  return { displayLimit: displayLimit, queryLimit: queryLimit };
};

const handleAddMunicipality = (state, code, name) => {
  if (isAlreadyAdded(code)) {
    return "Already added";
  } else {
    if (state.municipalities.length === 10) {
      return "Dosáhli jste maximálního počtu přidaných obcí. Pokud chcete vyhledat další obec, nějakou odeberte.";
    } else {
      return [
        { obec_kod: code, obec_nazev: name, limit: 90 },
        ...state.municipalities,
      ];
    }
  }
};

export function municipalitiesReducer(state, action) {
  switch (action.type) {
    case CHANGE_LIMIT:
      return handleDateLimitChange(state, action.selectedLimit);
    case ADD_MUNICIPALITY:
      return handleAddMunicipality(state, action.code, action.name);
    default:
      throw new Error();
  }
}
