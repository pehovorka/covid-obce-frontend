import React, { createContext, useReducer, useContext, useEffect } from "react";

import { municipalitiesReducer } from "../utils/municipalitiesReducer";
import {
  getMunicipalities,
  storeMunicipalitiesToLS,
} from "../utils/localStorageUtils";

const INITIAL_STATE = {
  municipalities: [],
  error: null,
};

const MunicipalitiesStateContext = createContext();
const MunicipalitiesDispatchContext = createContext();

export function MunicipalitiesProvider({ children }) {
  // Initialize reducer
  const [state, dispatch] = useReducer(municipalitiesReducer, {
    ...INITIAL_STATE,
    municipalities: getMunicipalities(),
  });

  // Update LocalStorage on change of state
  useEffect(() => {
    storeMunicipalitiesToLS(state.municipalities);
  }, [state.municipalities]);
  return (
    <MunicipalitiesStateContext.Provider value={state}>
      <MunicipalitiesDispatchContext.Provider value={dispatch}>
        {children}
      </MunicipalitiesDispatchContext.Provider>
    </MunicipalitiesStateContext.Provider>
  );
}

export function useMunicipalitiesState() {
  const context = useContext(MunicipalitiesStateContext);
  if (context === undefined) {
    throw new Error(
      "useMunicipalitiesState must be used within a MunicipalitiesProvider"
    );
  }
  return context;
}
export function useMunicipalitiesDispatch() {
  const context = useContext(MunicipalitiesDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useMunicipalitiesDispatch must be used within a MunicipalitiesProvider"
    );
  }
  return context;
}
