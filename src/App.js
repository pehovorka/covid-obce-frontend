import { gql, useQuery } from "@apollo/client";

import "./App.css";

const OBEC_QUERY = gql`
  query Obce_nazvy {
    obce(obec_nazev: "Horoměřice", datum: "2020-11-05") {
      obec_nazev
      aktualne_nemocnych
    }
  }
`;

function App() {
  const obce = useQuery(OBEC_QUERY, {});
  if (!obce.loading && !obce.error) {
    console.log(obce.data.obce);
  }
  return <>Nic</>;
}

export default App;
