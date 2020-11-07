import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { CircularProgress, TextField } from "@material-ui/core/";
import Autocomplete from "@material-ui/lab/Autocomplete";

const OBEC_QUERY = gql`
  query Obce_nazvy($obec_nazev: String!) {
    obce(obec_nazev: $obec_nazev, datum: "2020-11-05") {
      obec_nazev
      obec_kod
    }
  }
`;

export function SearchField() {
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [obec_nazev, setInputValue] = useState("");
  const obce = useQuery(OBEC_QUERY, {
    variables: { obec_nazev },
  });
  if (!obce.loading && !obce.error) {
    //console.log(obce.data.obce);
  }

  useEffect(() => {
    let active = true;

    if (!obce.loading && !obce.error) {
      setOptions(obce.data.obce);
    }
  });

  //Use this to add to local storage
  useEffect(() => {
    console.log(value);
  }, [value]);

  useEffect(() => {
    if (!autoCompleteOpen) {
      setOptions([]);
    }
  }, [autoCompleteOpen]);

  //console.log("Input value: " + obec_nazev);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 500 }}
      open={autoCompleteOpen}
      onOpen={() => {
        setAutoCompleteOpen(true);
      }}
      onClose={() => {
        setAutoCompleteOpen(false);
      }}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={obec_nazev}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      getOptionSelected={(option, value) =>
        option.obec_nazev === value.obec_nazev
      }
      getOptionLabel={(option) => option.obec_nazev}
      loading={obce.loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {obce.loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
