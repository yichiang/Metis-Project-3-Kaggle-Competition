import React, {Component } from 'react';
import { Button, Card, Image, Header, Table, Rating  } from 'semantic-ui-react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import $ from 'jquery'
import * as d3 from 'd3'
import '../../App.css';
class IpChartContainer extends Component {
  state = { toogleTooltip: true}
  constructor(props) {
    super(props);
    // this.getChart=this.getChart.bind(this)
  }


  componentDidMount() {

  }

  render() {
    console.log("props",this.props)
        return (
          <div>

            {this.props.data&&<div className='scrollChart'>
              <Header as='h2'>
                  Total Record and download Count by different IPs (Top 100)
                  <Header.Subheader>
                    It helps us to dectect ip dowload rate
                  </Header.Subheader>
                </Header>
                <BarChart width={2000} height={300} data={this.props.data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <CartesianGrid strokeDasharray="3 3"/>
                 <XAxis dataKey="ip"/>
                 <YAxis/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="record_count" fill="#0080ff" />
                 <Bar dataKey="dowload_count" fill="#b32400" />
              </BarChart>
            </div>}
        </div>
        )
    }
}

// export default ScatterChartContainer;
export default IpChartContainer
