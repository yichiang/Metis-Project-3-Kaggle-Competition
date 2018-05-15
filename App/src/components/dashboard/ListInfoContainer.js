import React, {Component } from 'react';
import { Button, Card, Image, Header, Table, Rating  } from 'semantic-ui-react'
import $ from 'jquery'
import * as d3 from 'd3'
import '../../App.css';
import ReactFauxDOM from 'react-faux-dom';
import ScatterChartContainer from './ScatterChartContainer'
import IpChartContainer from './IpChartContainer'
import HourLineChartContainer from './HourLineChartContainer'

const titles = [{
  mainTitle:"Total Record (x) and download Count (y) by different Apps (color)",
  subTItle:"It helps us to see app dowload rate"
},
{
  mainTitle:"Total Record and download Count by different Apps",
  subTItle:"It helps us to see app dowload rate"
}]

const titles2 = [{
  mainTitle:"Total Record (x) and download Count (y) by different Hour (color)",
  subTItle:""
},
{
  mainTitle:"Total Record and download Count by different Hour",
  subTItle:""
}]
class ListInfoContainer extends Component {
  state = { lastUpdated:'1/1/2019'}
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    this.getAppData()
    this.getIpData()
    this.getHourData()
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
  getHourData(){
    var url = 'http://127.0.0.1:5000/api/data/hour';
    var self=this
    $.ajax({
       url: url,
       type: "GET",
       dataType: 'json',
       success: function (data) {
         console.log(data)
         var convert_data = data.data;
         self.setState({hourData: convert_data});
       }.bind(this)
     });
  }

  render() {
    const {lastUpdated, data, ipData, hourData} = this.state;
        return (
          <div>
            {data&&<ScatterChartContainer data={data} keyName='app' titles={titles}/>}
            {ipData&&<IpChartContainer data={ipData}/>}
            {hourData&&<ScatterChartContainer data={hourData}  keyName='hr' titles={titles2}/>}
          </div>
        )
    }
}

export default ListInfoContainer;
