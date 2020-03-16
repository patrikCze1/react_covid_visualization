import React, { Component } from "react";
import Plot from "react-plotly.js";

class MapGraph extends Component {
  state = {
    width: 0
  };

  updateDimensions() {
    this.setState({ width: window.innerWidth * 0.9 });
    console.log('resize')
  }

  componentDidMount() {
    this.setState({ width: window.innerWidth * 0.9 });
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    let hoverText = [];
    const countryNames = this.props.countries.map(country => {
      //let total = country.confirmed + country.deaths + country.recovered;
      hoverText.push(country.countryRegion + ": " + country.confirmed);
      return country.countryRegion;
    });
    const countryConfirmed = this.props.countries.map(country => {
      if (country.confirmed > 10000) return 35;
      else if (country.confirmed > 1000) return 25;
      else if (country.confirmed > 100) return 15;
      else return 10;
    });

    return (
      <div data-aos="fade-up">
        <Plot
          data={[
            {
              type: "scattergeo",
              locationmode: "country names",
              locations: countryNames,
              marker: {
                size: countryConfirmed,
                line: {
                  color: "black"
                }
              },
              hoverinfo: "text",
              text: hoverText,
              name: "world data"
            }
          ]}
          layout={{
            title: "World map",
            width: this.state.width,
            height: 600,
            geo: {
              projection: {
                type: "robinson"
              }
            }
          }}
        />
      </div>
    );
  }
}

export default MapGraph;
