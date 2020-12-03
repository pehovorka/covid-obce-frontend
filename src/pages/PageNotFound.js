import React from "react";

export function PageNotFound({ message }) {
  return (
    <>
      <h1>Obec nenalezena</h1>
      <h2>{message}</h2>
    </>
  );
}
