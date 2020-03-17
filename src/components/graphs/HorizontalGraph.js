import React, { Component } from "react";
import Plot from "react-plotly.js";

class HorizontalGraph extends Component {
  state = {
    width: 0
  };

  updateDimensions() {
    if (window.innerWidth < 750) {
      this.setState({ width: window.innerWidth * 0.9 });
    } else {
      this.setState({ width: window.innerWidth * 0.45 });
    }
  }

  componentDidMount() {
    if (window.innerWidth < 750) {
      this.setState({ width: window.innerWidth * 0.9 });
    } else {
      this.setState({ width: window.innerWidth * 0.45 });
    }
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    let dataCountries = this.props.countries.slice(0, 9).reverse();

    const yAxis = dataCountries.map(country => country.countryRegion);
    const xAxis = dataCountries.map(country => country.confirmed);

    return (
      <div data-aos="fade-up">
        <Plot
          data={[
            {
              y: yAxis,
              x: xAxis,
              type: "bar",
              orientation: "h"
            }
          ]}
          layout={{
            width: this.state.width,
            title: "10 countries with most cases",
            showlegend: false,
            padding: {
              l: 50,
              r: 50,
              b: 100,
              t: 100
            }
          }}
        />
      </div>
    );
  }
}

export default HorizontalGraph;
