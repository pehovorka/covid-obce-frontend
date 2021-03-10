import { isAlreadyAdded } from "../utils/municipalityUtils";

export const CHANGE_LIMIT = "CHANGE_LIMIT";
export const ADD_MUNICIPALITY = "ADD_MUNICIPALITY";
export const REMOVE_MUNICIPALITY = "REMOVE_MUNICIPALITY";
export const CHANGE_ORDER = "CHANGE_ORDER";
export const SET_SNACKBAR_MESSAGE = "SET_SNACKBAR_MESSAGE";
export const REMOVE_SNACKBAR_MESSAGE = "REMOVE_SNACKBAR_MESSAGE";
export const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";
export const REMOVE_ALERT_MESSAGE = "REMOVE_ALERT_MESSAGE";

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
      snackBarMessage: {
        text: "Tato obec již byla přidána!",
        severity: "error",
      },
    };
  } else {
    if (state.municipalities.length === 10) {
      return {
        ...state,
        snackBarMessage: {
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

const setSnackbarMessage = (state, text, severity) => {
  return { ...state, snackBarMessage: { text, severity } };
};

const removeSnackbarMessage = (state) => {
  return { ...state, snackBarMessage: null };
};

const setAlertMessage = (state, text, severity) => {
  return { ...state, alertMessage: { text, severity } };
};

const removeAlertMessage = (state) => {
  return { ...state, alertMessage: null };
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
    case SET_SNACKBAR_MESSAGE:
      return setSnackbarMessage(state, action.text, action.severity);
    case REMOVE_SNACKBAR_MESSAGE:
      return removeSnackbarMessage(state);
    case SET_ALERT_MESSAGE:
      return setAlertMessage(state, action.text, action.severity);
    case REMOVE_ALERT_MESSAGE:
      return removeAlertMessage(state);
    default:
      throw new Error("You must specify an action type!");
  }
}
