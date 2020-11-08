import React from "react";
import { Link } from "@material-ui/core";

export function Footer() {
  return (
    <p>
      Zdroj dat:{" "}
      <Link
        href="https://share.uzis.cz/s/dCZBiARJ27ayeoS"
        target="_blank"
        rel="noreferrer"
      >
        ÚZIS
      </Link>
    </p>
  );
}
