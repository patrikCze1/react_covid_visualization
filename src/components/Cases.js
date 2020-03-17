import React, { Component } from "react";
import CaseItem from "./CaseItem";

class Cases extends Component {
  render() {
    const rows = this.props.countries.map((country, index) => {
      return <CaseItem countries={country} key={index} />;
    });
    
    return (
      <table className="table table-hover table-fixed">
        <thead>
          <tr>
            <th className="ta-left">Country</th>
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
}

export default Cases;
