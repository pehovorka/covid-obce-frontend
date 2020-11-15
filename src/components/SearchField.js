import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { CircularProgress, TextField } from "@material-ui/core/";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const OBEC_QUERY = gql`
  query Obce_nazvy($obec_nazev: String!) {
    obce(obec_nazev: $obec_nazev, datum: "2020-11-05") {
      obec_nazev
      obec_kod
    }
  }
`;

/* const suggestedTowns = [
  { obec_kod: "554782", obec_nazev: "Praha" },
  { obec_kod: "582786", obec_nazev: "Brno" },
  { obec_kod: "554821", obec_nazev: "Ostrava" },
  { obec_kod: "554791", obec_nazev: "Plzeň" },
  { obec_kod: "563889", obec_nazev: "Liberec" },
]; */

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: "#fff",
  },
  popupIndicator: {
    color: "#fff",
  },
  clearIndicator: {
    color: "#fff",
  },
}));

export function SearchField({ setSelectedTowns, addNewTown, inputRef }) {
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const obce = useQuery(OBEC_QUERY, {
    variables: { obec_nazev: inputValue },
  });

  useEffect(() => {
    if (!obce.loading && !obce.error) {
      setOptions(obce.data.obce);
    }
  }, [obce.data, obce.loading, obce.error, inputValue]);

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
      open={autoCompleteOpen}
      onOpen={() => {
        setAutoCompleteOpen(true);
      }}
      onClose={() => {
        setAutoCompleteOpen(false);
      }}
      onChange={(event, newValue) => {
        if (newValue !== null) {
          addNewTown(newValue.obec_kod, newValue.obec_nazev);
          window.gtag("event", "select_item", {
            items: [
              { item_id: newValue.obec_kod, item_name: newValue.obec_nazev },
            ],
          });
        }
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
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
