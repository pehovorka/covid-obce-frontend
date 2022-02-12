import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import { Paper, Typography } from "@mui/material";

function Title({ map }) {
  useEffect(() => {
    if (map) {
      const legend = L.control({ position: "topleft" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "title");
        div.innerHTML = ReactDOMServer.renderToString(
          <Paper
            variant="outlined"
            sx={{ backgroundColor: "rgba(255,255,255,0.7)" }}
          >
            <Typography variant="body1" component="h2" p={1}>
              Mapa obcí – aktivní případy na 1000 obyvatel
            </Typography>
          </Paper>
        );
        return div;
      };

      legend.addTo(map);

      L.control
        .zoom({
          position: "bottomleft",
        })
        .addTo(map);
    }
  }, [map]);
  return null;
}

Title.propTypes = { map: PropTypes.object };

export default Title;
