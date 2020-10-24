import React, { Component } from 'react';
import Scale from '../scale/scale';
import History from '../history/history';
import './current.scss';

class Current extends Component {
  render() {
    const { current, scale } = this.props;
    const icon = current.condition.icon;

    return (
      <div className="grid-current">
        <div className="date">{current.date}</div>
        <div className="condition">{current.condition.text}</div>
        <div className="temperature">
          <span>
            {current[scale]}
            <Scale scale={scale}/>
          </span>
        </div>
        <div className="icon">
          <img src={icon} className="img-responsive" width="200" height="200" alt="daily weather"/>
        </div>
        <div className="day-time">
          <History history={current.history} scale={scale} />
        </div>
      </div>
    );
  }
}

export default Current;
