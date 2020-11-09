import React from "react";
import { Link } from "@material-ui/core";

export function Footer() {
  return (
    <p>
      <Link
        href="https://www.linkedin.com/in/petr-hovorka-40a198b2/"
        target="_blank"
        rel="noreferrer"
      >
        Kontakt
      </Link>{" "}
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
