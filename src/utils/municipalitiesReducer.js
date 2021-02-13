import { isAlreadyAdded } from "../utils/municipalityUtils";

export const CHANGE_LIMIT = "CHANGE_LIMIT";
export const ADD_MUNICIPALITY = "ADD_MUNICIPALITY";
export const REMOVE_MUNICIPALITY = "REMOVE_MUNICIPALITY";

const handleDateLimitChange = (state, selectedLimit) => {
  const displayLimit = selectedLimit;
  let queryLimit = state.queryLimit;
  if (selectedLimit === 0) {
    queryLimit = 0;
  }
  return { displayLimit: displayLimit, queryLimit: queryLimit };
};

const handleAdd = (state, code, name) => {
  if (
    isAlreadyAdded({
      municipalityCodeToCheck: code,
      municipalities: state,
    })
  ) {
    console.log("Tato obec již byla přidána!");
    return state;
  } else {
    if (state.length === 10) {
      console.log(
        "Dosáhli jste maximálního počtu přidaných obcí. Pokud chcete vyhledat další obec, nějakou odeberte."
      );
      return state;
    } else {
      return [{ obec_kod: code, obec_nazev: name, limit: 90 }, ...state];
    }
  }
};

const handleRemove = (state, code) => {
  return state.filter((municipality) => municipality.obec_kod !== code);
};

export function municipalitiesReducer(state, action) {
  switch (action.type) {
    case CHANGE_LIMIT:
      return handleDateLimitChange(state, action.selectedLimit);
    case ADD_MUNICIPALITY:
      return handleAdd(state, action.code, action.name);
    case REMOVE_MUNICIPALITY:
      return handleRemove(state, action.code);
    default:
      throw new Error();
  }
}
