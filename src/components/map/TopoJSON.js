import React, { useEffect, useRef } from "react";
import { GeoJSON } from "react-leaflet";
import * as topojson from "topojson-client";

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
    feature.properties = getMunicipality(id, props.municipalityCasesOverview);
    layer.bindPopup(
      `<b>${feature.properties.mn}</b><br />${feature.properties.rc}`
    );
  }

  useEffect(() => {
    const layer = layerRef.current;
    addData(layer, props.data);
  }, [props]);

  const style = (feature) => {
    return {
      color: "#fff",
      weight: 1,
      opacity: 0.3,
      fillOpacity: 0.8,
      fillColor: getColor(
        getMunicipality(feature.id, props.municipalityCasesOverview).rc
      ),
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
