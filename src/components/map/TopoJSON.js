import React, { useEffect, useRef } from "react";
import { GeoJSON } from "react-leaflet";
import * as topojson from "topojson-client";
import { numberToString } from "../../utils/general";

import { getMunicipality } from "./utils/filterMunicipality";
import { getColor } from "./utils/mapColors";

export default function TopoJSON(props) {
  const layerRef = useRef();
  const { data, ...otherProps } = props;

  function addData(layer, jsonData) {
    if (jsonData.type === "Topology") {
      for (let key in jsonData.objects) {
        let geojson = topojson.feature(jsonData, jsonData.objects[key]);
        layer.addData(geojson);
      }
    } else {
      layer.addData(jsonData);
    }
  }

  function onEachFeature(feature, layer) {
    const { id } = feature;
    const municipalityProps = getMunicipality(
      id,
      props.municipalityCasesOverview
    );
    feature.properties = {
      ...municipalityProps,
      color: getColor(municipalityProps.rc),
    };
    layer.options.fillColor = feature.properties.color;
    layer.bindPopup(
      `<b>${feature.properties.mn}</b>
      <br />
      <br />
      Aktivní případy na 1000 obyvatel: ${
        feature.properties.rc !== null
          ? numberToString(feature.properties.rc, 1)
          : "není k dispozici"
      }
      <br />
      Aktivní případy:  ${numberToString(feature.properties.ac, 1)}
      <br />
      <br />
      <i>Data aktuální k ${new Date(feature.properties.d).toLocaleDateString(
        "cs-CZ"
      )}</i>
      `
    );
  }

  useEffect(() => {
    const layer = layerRef.current;
    addData(layer, props.data);
  }, [props.data]);

  const style = (feature) => {
    return {
      color: "#fff",
      weight: 1,
      opacity: 0.2,
      fillOpacity: 0.8,
    };
  };

  return (
    <GeoJSON
      ref={layerRef}
      {...otherProps}
      style={style}
      onEachFeature={onEachFeature}
    />
  );
}
