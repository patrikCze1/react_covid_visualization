import React, { Component } from "react";
import Plot from "react-plotly.js";

class PieGraph extends Component {
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
    const { confirmed, recovered, deaths } = this.props.cases;

    return (
        <Plot
          data={[
            {
              values: [confirmed, recovered, deaths],
              labels: ["Confirmed", "Recovered", "Deaths"],
              marker: {
                colors: ["#3976af", "#529d3f", "#c63a33"]
              },
              type: "pie",
              title: {
                position: "top center"
              },
              showlegend: true
            }
          ]}
          layout={{
            title: "Percentage",
            width: this.state.width
          }}
        />
    );
  }
}

export default PieGraph;
