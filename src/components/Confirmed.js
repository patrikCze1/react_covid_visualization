import React, { Component } from "react";
import ConfirmedItem from "./ConfirmedItem";

class Confirmed extends Component {
  render() {
    
    return (
      <ConfirmedItem
        countries={this.props.countries}
      />
    );
  }
}

export default Confirmed;
