import React, { Component } from "react";

class CountryInfo extends Component {
  state = {
    countryInfo: {},
    loading: true
  };

  componentDidMount() {
    const url = `https://restcountries.eu/rest/v2/name/${this.props.name}`;

    fetch(url)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then((
        res //console.log(res)
      ) =>
        this.setState({
          countryInfo: {
            continent: res[0].region,
            population: res[0].population.toLocaleString()
          },
          loading: false
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.loading) return (
      <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
    )

    let { population, continent } = this.state.countryInfo;
    if (!population || !continent) {
      population = 'No info'
      continent = 'No info'
    }
    
    return (
      
      <table className="">
        <tr>
          <td>Population</td>
          <td className="ta-left">{population}</td>
        </tr>
        <tr>
          <td>Geography</td>
          <td className="ta-left">{continent}</td>
        </tr>
      </table>
    
    );
  }
}

export default CountryInfo;
