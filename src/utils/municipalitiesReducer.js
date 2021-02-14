import { isAlreadyAdded } from "../utils/municipalityUtils";

export const CHANGE_LIMIT = "CHANGE_LIMIT";
export const ADD_MUNICIPALITY = "ADD_MUNICIPALITY";
export const REMOVE_MUNICIPALITY = "REMOVE_MUNICIPALITY";
export const CHANGE_ORDER = "CHANGE_ORDER";

const handleLimitChange = (state, code, selectedLimit) => {
  console.log("changing", state, code, selectedLimit);
  const municipalities = state.map((municipality) => {
    if (municipality.obec_kod === code) {
      return {
        ...municipality,
        limit: selectedLimit,
      };
    }
    return municipality;
  });
  return municipalities;
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

const handleChangeOrder = (newOrder) => {
  return newOrder;
};

export function municipalitiesReducer(state, action) {
  switch (action.type) {
    case CHANGE_LIMIT:
      return handleLimitChange(state, action.code, action.selectedLimit);
    case ADD_MUNICIPALITY:
      return handleAdd(state, action.code, action.name);
    case REMOVE_MUNICIPALITY:
      return handleRemove(state, action.code);
    case CHANGE_ORDER:
      return handleChangeOrder(action.newOrder);
    default:
      throw new Error("You must specify an action type!");
  }
}
