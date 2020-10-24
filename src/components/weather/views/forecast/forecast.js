import React, { Component } from 'react';
import './forecast.scss';

class Forecast extends Component {
  render() {
    const { forecast, scale } = this.props;

    const forecastList = forecast.map((day, i) =>
      <div key={i}>
        <p className="pName">{day.name}</p>
        <img src={day.icon} className="img-responsive" width="100" height="100" alt="daily weather" />
        <p className="pTemp"><span className="maxTemp">{day.maxTemp[scale]}&deg;</span> <span className="minTemp">{day.minTemp[scale]}&deg;</span></p>
      </div>
    );

    return (
      <div className="grid-forecast">
        {forecastList}
      </div>
    );
  }
}

export default Forecast;
