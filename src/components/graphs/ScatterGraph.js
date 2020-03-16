import React, { Component } from "react";
import Plot from "react-plotly.js";

class ScatterGraph extends Component {
  state = {
    width: 0
  };

  updateDimensions() {
    this.setState({ width: window.innerWidth * 0.9 });
  }

  componentDidMount() {
    this.setState({ width: window.innerWidth * 0.9 });
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const days = this.props.dailyData.map(day => day.reportDateString);
    const c = this.props.dailyData.map(day => day.totalConfirmed);
    const r = this.props.dailyData.map(day => day.totalRecovered);

    const confirmed = {
      x: days,
      y: r,
      name: "Recovered",
      fill: "tozeroy",
      fillcolor: "#529d3f",
      type: "scatter",
      mode: "none"
    };

    const recovered = {
      x: days,
      y: c,
      name: "Confirmed",
      fill: "tonexty",
      fillcolor: "#3976af",
      type: "scatter",
      mode: "none"
    };

    return (
      <div data-aos="fade-up">
        <Plot
          data={[confirmed, recovered]}
          layout={{
            title: "Historic data",
            width: this.state.width
          }}
        />
      </div>
    );
  }
}

export default ScatterGraph;
