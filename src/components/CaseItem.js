import React from "react";
import { Link } from "react-router-dom";

function CaseItem(props) {
  return (
    <tr className="fade-up">
      <td className="ta-left">
        <Link
          to={{
            pathname: props.country.countryRegion,
            state: { countryData: props.country }
          }}
        >
          <img
            src={`https://www.countryflags.io/${props.country.iso2}/flat/24.png`}
            className="flag"
          />
          {props.country.countryRegion}
        </Link>
      </td>
      <td>{props.country.confirmed.toLocaleString()}</td>
      <td>{props.country.active ? props.country.active.toLocaleString() : 0}</td>
      <td>{props.country.recovered.toLocaleString()}</td>
      <td>{props.country.deaths.toLocaleString()}</td>
    </tr>
  );
}

export default CaseItem;
