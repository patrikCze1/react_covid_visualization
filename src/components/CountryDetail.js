import React from "react";
import CountryDetailInfo from "./CountryDetailInfo";
import { useLocation } from "react-router-dom";
import PieGraph from './graphs/PieGraph';

function CountryDetail(props) {
  const { state } = useLocation();
  const confirmed = state.countryData.confirmed;
  const recovered = state.countryData.recovered;
  const deaths = state.countryData.deaths;
  const actual = confirmed - recovered - deaths;

  return (
    <div className="row">
      <div id="countryInfo" className="col-2 ta-left fade-up">
        <h2>{state.countryData.countryRegion} <img src={`https://www.countryflags.io/${state.countryData.iso2}/flat/32.png`} className="flag" /></h2>
        <table>
          <tr>
            <td>Confirmed</td>
            <td className="ta-left c-blue">{confirmed.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Actual cases</td>
            <td className="ta-left">{actual.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Recovered</td>
            <td className="ta-left c-green">{recovered.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Deaths</td>
            <td className="ta-left c-red">{deaths.toLocaleString()}</td>
          </tr>
        </table>

        <h3>Country basic info</h3>
        <CountryDetailInfo name={state.countryData.countryRegion} />
      </div>

      <div className="col-2 fade-up">
        <PieGraph cases={{confirmed: confirmed, recovered: recovered, deaths: deaths}} />
      </div>
    </div>
  );
}

export default CountryDetail;
