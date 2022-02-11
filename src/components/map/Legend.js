import { useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import { Box, Grid, Paper } from "@mui/material";
import { getColor, GRADES } from "./utils/mapColors";
import { numberToString } from "../../utils/general";

function Legend({ map }) {
  useEffect(() => {
    if (map) {
      const legend = L.control({ position: "bottomright" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.innerHTML = ReactDOMServer.renderToString(
          <Paper>
            <Box p={1}>
              <Grid container direction="column">
                {GRADES.map((grade, index) => (
                  <Grid item key={index}>
                    <Grid container spacing={1} justifyContent="space-between">
                      <Grid item>
                        <i
                          style={{
                            backgroundColor: getColor(grade),
                            height: "1rem",
                            width: "1rem",
                            display: "block",
                            opacity: 0.8,
                          }}
                        />
                      </Grid>
                      <Grid item>
                        {index === 0
                          ? "0"
                          : GRADES[index + 1]
                          ? `${numberToString(grade, 1)} – ${numberToString(
                              GRADES[index + 1] - 0.1,
                              1
                            )}`
                          : `${numberToString(grade, 1)} +`}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        );
        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
}

Legend.propTypes = { map: PropTypes.object };

export default Legend;
