import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { CircularProgress, TextField } from "@material-ui/core/";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";

import { useMunicipalitiesDispatch } from "../../../providers/MunicipalitiesProvider";
import {
  ADD_MUNICIPALITY,
  SET_SNACKBAR_MESSAGE,
} from "../../../utils/municipalitiesReducer";
import { MUNICIPALITY_NAMES_SEARCH_QUERY } from "../../../utils/queries";
import { useStyles } from "./SearchField.style";

export default function SearchField({ inputRef }) {
  const dispatch = useMunicipalitiesDispatch();
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const obce = useQuery(MUNICIPALITY_NAMES_SEARCH_QUERY, {
    variables: { obec_nazev: inputValue },
    skip: inputValue.length < 2 ? true : false,
  });

  useEffect(() => {
    if (!obce.loading && !obce.error) {
      setOptions(obce?.data?.obce || []);
    } else if (obce.error) {
      dispatch({
        type: SET_SNACKBAR_MESSAGE,
        text: "Nepodařilo se připojit k serveru. Zkuste to prosím později.",
        severity: "error",
      });
    }
  }, [obce.data, obce.loading, obce.error, inputValue, dispatch]);

  const classes = useStyles();

  const filterOptions = createFilterOptions({
    trim: true,
  });

  return (
    <Autocomplete
      id="obce-search"
      classes={classes}
      openOnFocus
      noOptionsText={"Žádné výsledky"}
      loadingText={"Načítám..."}
      clearText={"Vymazat"}
      open={autoCompleteOpen}
      onOpen={() => {
        setAutoCompleteOpen(true);
      }}
      onClose={() => {
        setAutoCompleteOpen(false);
      }}
      onChange={(event, newValue) => {
        if (newValue !== null) {
          dispatch({
            type: ADD_MUNICIPALITY,
            code: newValue.obec_kod,
            name: newValue.obec_nazev,
          });
          window.gtag("event", "select_item", {
            items: [
              { item_id: newValue.obec_kod, item_name: newValue.obec_nazev },
            ],
          });
          // Clears input if typed name is exactly the same as autocomplete item
          setInputValue("");
        }
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        if (event?.type === "change") {
          setInputValue(newInputValue);
        } else {
          // Clears input if autocomplete item is selected on click or if enter key is pressed
          setInputValue("");
        }
      }}
      options={options}
      getOptionSelected={(option, value) =>
        option.obec_nazev === value.obec_nazev
      }
      getOptionLabel={(option) => option.obec_nazev}
      loading={obce.loading}
      clearOnBlur={false}
      autoHighlight={true}
      filterOptions={filterOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Začněte vyhledávat obec..."
          variant="outlined"
          inputRef={inputRef}
          InputProps={{
            ...params.InputProps,
            startAdornment: <SearchIcon style={{ color: "#fff" }} />,
            endAdornment: (
              <>
                {obce.loading || obce.error ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
