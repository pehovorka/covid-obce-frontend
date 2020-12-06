import { React } from "react";
import { Link as RouterLink } from "react-router-dom";
import { route } from "../Routes";
import { Button } from "@material-ui/core/";
import SearchIcon from "@material-ui/icons/Search";

export function SearchButton({ text }) {
  const LinkComponent = (props) => {
    return (
      <RouterLink
        {...props}
        to={{
          pathname: route.home(),
          state: { searchAutoFocus: true },
        }}
      />
    );
  };
  return (
    <Button
      startIcon={<SearchIcon />}
      variant="contained"
      color="secondary"
      disableElevation={true}
      component={LinkComponent}
    >
      {text ? text : "Hledat obec"}
    </Button>
  );
}
