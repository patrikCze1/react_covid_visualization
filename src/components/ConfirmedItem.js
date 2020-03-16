import React from "react";
import CountryDetail from './CountryDetail';
import { Link } from "react-router-dom";

function ConfirmedItem(props) {
  const rows = props.countries.map((country, index) => {
    return (
      <tr
        key={index}
        className="fade-up"
      >
        <td>
          <Link to={{pathname: country.countryRegion, state: {countryData: country}}}>{country.countryRegion}</Link>
        </td>
        <td>{country.confirmed.toLocaleString()}</td>
        <td>{country.active ? country.active.toLocaleString() : 0}</td>
        <td>{country.recovered.toLocaleString()}</td>
        <td>{country.deaths.toLocaleString()}</td>
      </tr>
    );
  });

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Country</th>
          <th>Confirmed</th>
          <th>Active</th>
          <th>Recovered</th>
          <th>Deaths</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default ConfirmedItem;
