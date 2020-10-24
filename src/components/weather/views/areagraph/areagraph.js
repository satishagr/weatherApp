import React, { Component } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip,
  } from 'recharts';
import './areagraph.scss';

class AreaGraph extends Component {
  render() {

    const { hourly, scale } = this.props;
    var point_1 = []
    const label = scale === 'temp_c' ? 'C' : 'F';
    var pl = []
    for(let hourData of hourly){
      let time_1;
      if (parseInt(hourData.time)===12)
        time_1 = hourData.time+' PM';
      else if (parseInt(hourData.time)===0)
        time_1 = '12 AM';
      else if (parseInt(hourData.time)<12)
        time_1 = hourData.time+' AM';
      else
        time_1 = hourData.time-12+' PM';
      let ttp = {date: hourData.tooltp, temp: hourData[scale]+unescape('%B0')+{label}};
      point_1.push({ts: time_1, temp: hourData[scale]});
      pl.push(ttp);
    }

    let vals = []
    let maxTemp = 0.0;
    for (let i = 0; i < point_1.length; i++) {
      vals.push(i);
      maxTemp = Math.max(maxTemp, point_1[i].y)
    }

    let data = point_1.slice(0,24);

    return (
        <div className="grid-areagraph">
            <AreaChart
                width={800}
                height={200}
                data={data}
                margin={{
                top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <XAxis dataKey="ts" />
                <YAxis />
                <Tooltip payload={pl} />
                <Area type="monotone" dataKey="temp" stroke="#FF7F50" fill="#FF7F50" />
            </AreaChart>
        </div>
    );
  }
}

export default AreaGraph;
