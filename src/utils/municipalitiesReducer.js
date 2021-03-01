import { isAlreadyAdded } from "../utils/municipalityUtils";

export const CHANGE_LIMIT = "CHANGE_LIMIT";
export const ADD_MUNICIPALITY = "ADD_MUNICIPALITY";
export const REMOVE_MUNICIPALITY = "REMOVE_MUNICIPALITY";
export const CHANGE_ORDER = "CHANGE_ORDER";
export const SET_MESSAGE = "SET_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";

const handleLimitChange = (state, code, selectedLimit) => {
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
    return {
      ...state,
      message: {
        text: "Tato obec již byla přidána!",
        severity: "error",
      },
    };
  } else {
    if (state.municipalities.length === 10) {
      return {
        ...state,
        message: {
          text:
            "Dosáhli jste maximálního počtu přidaných obcí. Pokud chcete vyhledat další obec, nějakou odeberte.",
          severity: "error",
        },
      };
    } else {
      const newState = {
        ...state,
        municipalities: [
          { code: code, name: name, limit: 90 },
          ...state.municipalities,
        ],
      };
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

const setMessage = (state, text, severity) => {
  return { ...state, message: { text, severity } };
};

const removeMessage = (state) => {
  return { ...state, message: null };
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
    case SET_MESSAGE:
      return setMessage(state, action.text, action.severity);
    case REMOVE_MESSAGE:
      return removeMessage(state);
    default:
      throw new Error("You must specify an action type!");
  }
}
