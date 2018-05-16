import React, {Component } from 'react';
import { Button, Card, Image, Header, Table, Rating  } from 'semantic-ui-react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import $ from 'jquery'
import * as d3 from 'd3'
import '../../App.css';
import {PieChart, Pie, Sector, Cell} from 'recharts';

class APPPieContainer extends Component {
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

            {this.props.data&&<div>

            </div>}
        </div>
        )
    }
}

// export default ScatterChartContainer;
export default APPPieContainer
