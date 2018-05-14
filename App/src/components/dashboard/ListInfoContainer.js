import React, {Component } from 'react';
import { Button, Card, Image, Header, Table, Rating  } from 'semantic-ui-react'
import $ from 'jquery'
import * as d3 from 'd3'
import '../../App.css';
import ReactFauxDOM from 'react-faux-dom';
import ScatterChartContainer from './ScatterChartContainer'
import IpChartContainer from './IpChartContainer'

class ListInfoContainer extends Component {
  state = { lastUpdated:'1/1/2019'}
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    this.getAppData()
    this.getIpData()
  }

  getAppData(){
    var url = 'http://127.0.0.1:5000/api/data/app';
    var self=this
    $.ajax({
       url: url,
       type: "GET",
       dataType: 'json',
       success: function (data) {
         console.log(data)
         var convert_data = data.data;
         self.setState({data: convert_data});
       }.bind(this)
     });
  }
  getIpData(){
    var url = 'http://127.0.0.1:5000/api/data/ip';
    var self=this
    $.ajax({
       url: url,
       type: "GET",
       dataType: 'json',
       success: function (data) {
         console.log(data)
         var convert_data = data.data;
         self.setState({ipData: convert_data});
       }.bind(this)
     });
  }

  render() {
    const {lastUpdated, data, ipData} = this.state;
        return (
          <div>
            {data&&<ScatterChartContainer data={data}/>}
            {ipData&&<IpChartContainer data={ipData}/>}
          </div>
        )
    }
}

export default ListInfoContainer;
