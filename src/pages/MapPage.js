import React from "react";
import { AppBar, Footer } from "../components/layout";
import { Seo } from "../utils/Seo";
import Map from "../components/map/Map";

export default function MapPage() {
  return (
    <>
      <Seo title="Mapa obcí" />
      <AppBar />
      <Map />
      <Footer />
    </>
  );
}
