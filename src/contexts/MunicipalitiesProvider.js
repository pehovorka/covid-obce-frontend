import React, { createContext, useReducer, useContext, useEffect } from "react";

import { municipalitiesReducer } from "../utils/municipalitiesReducer";

const MunicipalitiesStateContext = createContext();
const MunicipalitiesDispatchContext = createContext();

export function MunicipalitiesProvider({ children }) {
  const [state, dispatch] = useReducer(
    municipalitiesReducer,
    JSON.parse(localStorage.getItem("obce")) || []
  );

  // Update LocalStorage on change of state
  useEffect(() => {
    localStorage.setItem("obce", JSON.stringify(state));
  }, [state]);
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
