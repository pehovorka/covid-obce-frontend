import { React } from "react";
import { Box, CircularProgress } from "@mui/material/";

export default function LoadingIndicator() {
  return (
    <Box
      height={388}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <CircularProgress size={50} />
      </Box>
    </Box>
  );
}
