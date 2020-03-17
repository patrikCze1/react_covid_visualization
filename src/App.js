import React from "react";
import Header from "./components/Header";
import Cases from "./components/Cases";
import CountryDetail from "./components/CountryDetail";
import MapGraph from "./components/graphs/MapGraph";
import HorizontalGraph from "./components/graphs/HorizontalGraph";
import PieGraph from "./components/graphs/PieGraph";
import ScatterGraph from "./components/graphs/ScatterGraph";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

class App extends React.Component {
  state = {
    countries: [],
    dailyData: [],
    loading: true,
    selectedCountry: "",
    total: {
      confirmed: 0,
      deaths: 0,
      recovered: 0,
      lastUpdate: ""
    }
  };

  componentDidMount() {
    let url = "https://covid19.mathdro.id/api";

    fetch(url)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res =>
        this.setState({
          total: {
            confirmed: res.confirmed.value,
            deaths: res.deaths.value,
            recovered: res.recovered.value,
            lastUpdate: res.lastUpdate
          }
        })
      )
      .catch(err => console.log(err));

    url = "https://covid19.mathdro.id/api/confirmed";

    fetch(url)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        this.setState({
          countries: this.sortCountries(res)
        });
      })
      .catch(err => console.log(err));

    url = "https://covid19.mathdro.id/api/daily";

    fetch(url)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => {
        this.setState({
          dailyData: res,
          loading: false
        });
      })
      .catch(err => console.log(err));
  }

  sortCountries = countries => {
    let arrWithProvince = [];
    let arrWithoutProvince = [];
    let countryNames = [];

    countries.forEach(country => {
      if (country.provinceState) {
        countryNames.push(country.countryRegion);
        arrWithProvince.push(country);
      } else {
        arrWithoutProvince.push(country);
      }
    });

    arrWithProvince.forEach(country => {
      arrWithProvince.forEach(c => {
        if (country.countryRegion === c.countryRegion) {
          if (country.provinceState !== c.provinceState) {
            country.confirmed += c.confirmed;
            country.deaths += c.deaths;
            country.recovered += c.recovered;
          }
        }
      });
    });

    let arr = [];
    for (let i = 0; i < countryNames.length; i++) {
      let obj = arrWithProvince.find(
        country => country.countryRegion === countryNames[i]
      );
      if (obj) {
        arr.push(obj);
        continue;
      }
    }

    let r = [];
    const m = new Map();
    for (const item of arr) {
      if (!m.has(item.countryRegion)) {
        m.set(item.countryRegion, true); // set any value to Map
        r.push(item);
      }
    }

    let result = r.concat(arrWithoutProvince);

    result.sort(function(a, b) {
      if (a.confirmed > b.confirmed) {
        return 1;
      }
      if (b.confirmed > a.confirmed) {
        return -1;
      }
      return 0;
    });

    return result.reverse();
  };

  render() {
    if (this.state.loading)
      return (
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      );

    return (
      <div className="App">
        <Router>
          <Header total={this.state.total} />
          <div className="container">
            <div className="links mar-top-bot">
              <Link to="/" className="padd-left-right">
                Home
              </Link>
              <Link to="/coutries" className="padd-left-right">
                All countries
              </Link>
            </div>

            <Switch>
              <Route path="/coutries">
                <Cases countries={this.state.countries} />
              </Route>

              <Route path="/:name">
                <CountryDetail />
              </Route>

              <Route path="/">
                <div className="">
                  <div className="w-100-p">
                    <MapGraph countries={this.state.countries} />
                  </div>

                  <div className="w-100-p">
                    <ScatterGraph dailyData={this.state.dailyData} />
                  </div>

                  <div className="row">
                    <div className="col-2">
                      <HorizontalGraph countries={this.state.countries} />
                    </div>
                    <div className="col-2">
                      <PieGraph cases={this.state.total} />
                    </div>
                  </div>
                </div>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
