import React, { Component } from 'react';
import Header from './views/header/header';
import Current from './views/current/current';
import Forecast from './views/forecast/forecast';
import AreaGraph from './views/areagraph/areagraph';
import './weather.scss';

class Weather extends Component {
  render() {
    const { location, current, forecast, hourly } = this.props.weather;
    const { scale } = this.props;

    return (
      <div className="weather">
        <Header
          title={location}
          scale={scale}
          goBackButtonClick={this.props.onGoBack}
          scaleChangeClick={this.props.onScaleChange}
        />
        <Current current={current} scale={scale}/>
        <AreaGraph hourly={hourly} scale={scale} />
        <Forecast forecast={forecast} scale={scale}/>
      </div>
    );
  }
}

export default Weather;
