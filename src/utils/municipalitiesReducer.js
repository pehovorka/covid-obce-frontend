import { isAlreadyAdded } from "../utils/municipalityUtils";

export const CHANGE_LIMIT = "CHANGE_LIMIT";
export const ADD_MUNICIPALITY = "ADD_MUNICIPALITY";
export const REMOVE_MUNICIPALITY = "REMOVE_MUNICIPALITY";
export const CHANGE_ORDER = "CHANGE_ORDER";

const handleLimitChange = (state, code, selectedLimit) => {
  console.log("changing", state, code, selectedLimit);
  const municipalities = state.municipalities.map((municipality) => {
    if (municipality.code === code) {
      return {
        ...municipality,
        limit: selectedLimit,
      };
    }
    return municipality;
  });
  return { ...state, municipalities: municipalities };
};

const handleAdd = (state, code, name) => {
  if (
    isAlreadyAdded({
      municipalityCodeToCheck: code,
      municipalities: state.municipalities,
    })
  ) {
    console.log("Tato obec již byla přidána!");
    return state;
  } else {
    if (state.municipalities.length === 10) {
      console.log(
        "Dosáhli jste maximálního počtu přidaných obcí. Pokud chcete vyhledat další obec, nějakou odeberte."
      );
      return state;
    } else {
      const newState = {
        ...state,
        municipalities: [
          { code: code, name: name, limit: 90 },
          ...state.municipalities,
        ],
      };
      console.log("newState", newState);
      return newState;
    }
  }
};

const handleRemove = (state, code) => {
  return {
    ...state,
    municipalities: state.municipalities.filter(
      (municipality) => municipality.code !== code
    ),
  };
};

const handleChangeOrder = (state, newOrder) => {
  return { ...state, municipalities: newOrder };
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
      return handleChangeOrder(state, action.newOrder);
    default:
      throw new Error("You must specify an action type!");
  }
}
