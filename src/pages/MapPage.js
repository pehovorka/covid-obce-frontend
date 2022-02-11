import React, { lazy, Suspense } from "react";
import { AppBar, Footer } from "../components/layout";

import MapLoadingScreen from "../components/map/MapLoadingScreen";
import { Seo } from "../utils/Seo";
const Map = lazy(() => import("../components/map/Map"));

export default function MapPage() {
  return (
    <>
      <Seo title="Mapa obcí" />
      <AppBar />
      <Suspense fallback={<MapLoadingScreen />}>
        <Map />
      </Suspense>
      <Footer />
    </>
  );
}
