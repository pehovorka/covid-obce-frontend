import { useEffect } from "react";
import useSWR from "swr";

import { useMunicipalitiesDispatch } from "../providers/MunicipalitiesProvider";
import {
  REMOVE_ALERT_MESSAGE,
  SET_ALERT_MESSAGE,
  SET_SNACKBAR_MESSAGE,
} from "./municipalitiesReducer";

export function MessagesFetcher() {
  const dispatch = useMunicipalitiesDispatch();

  const url = process.env.REACT_APP_MESSAGES_URL;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR(url, fetcher);

  useEffect(() => {
    if (data) {
      data.alertMessage &&
        dispatch({
          type: SET_ALERT_MESSAGE,
          text: data.alertMessage.text,
          severity: data.alertMessage.severity,
        });

      !data.alertMessage &&
        dispatch({
          type: REMOVE_ALERT_MESSAGE,
        });

      data.snackbarMessage &&
        dispatch({
          type: SET_SNACKBAR_MESSAGE,
          text: data.snackbarMessage.text,
          severity: data.snackbarMessage.severity,
        });
    }
  }, [data, dispatch]);

  return null;
}
