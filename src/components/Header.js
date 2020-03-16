import React from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

function Header(props) {
  const { confirmed, recovered, deaths, lastUpdate } = props.total;
  const date = new Date(lastUpdate);
  const update = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getYear()}`

  console.log("render");
  return (
    <header className="header">
      <nav className="container">
        <Link to="/">
          <h1>Covid-19 stats</h1>
        </Link>

        <div className="row">
          <CountUp start={0} end={confirmed} duration={2} delay={0} separator=','>
            {({ countUpRef }) => (
              <div className="col-3">
                <h3 className="c-blue">
                  Confirmed: <span ref={countUpRef} />
                </h3>
              </div>
            )}
          </CountUp>

          <CountUp start={0} end={recovered} duration={2} delay={0} separator=','>
            {({ countUpRef }) => (
              <div className="col-3">
                <h3 className="c-green">
                    Recovered: <span ref={countUpRef} />
                </h3>
              </div>
            )}
          </CountUp>

          <CountUp start={0} end={deaths} duration={2} delay={0} separator=','>
            {({ countUpRef }) => (
              <div className="col-3">
                <h3 className="c-red">
                    Deaths: <span ref={countUpRef} />
                </h3>
              </div>
            )}
          </CountUp>
          </div>
        <p>Last update {update}</p>
      </nav>
    </header>
  );
}

export default Header;
