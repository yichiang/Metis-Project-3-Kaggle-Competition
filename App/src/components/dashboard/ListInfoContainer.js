import React, {Component } from 'react';
import { Button, Card, Image, Header, Table, Rating  } from 'semantic-ui-react'
import $ from 'jquery'
import * as d3 from 'd3'
import '../../App.css';
import ReactFauxDOM from 'react-faux-dom';
import ScatterChartContainer from './ScatterChartContainer'
import IpChartContainer from './IpChartContainer'
import HourLineChartContainer from './HourLineChartContainer'
import APPPieContainer from './APPPieContainer'

const titles = [{
  mainTitle:"Total Record (x) and download Count (y) by different apps (color)",
  subTItle:"It helps us to see app dowload rate"
},
{
  mainTitle:"Total Record and download Count by different apps",
  subTItle:""
}]

const titles2 = [{
  mainTitle:"Total Record (x) and download Count (y) by different hour (color)",
  subTItle:""
},
{
  mainTitle:"Total Record and download Count by different hour",
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
    var url = this.props.domainUrl+'/api/data/app';
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
    var url = this.props.domainUrl+'/api/data/ip';
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
    var url = this.props.domainUrl+'/api/data/hour';
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
    const {domainUrl} = this.props;
    const {lastUpdated, data, ipData, hourData} = this.state;
        return (
          <div>
            {data&&<ScatterChartContainer data={data} keyName='app' titles={titles} domainUrl={domainUrl}/>}
            {ipData&&<IpChartContainer data={ipData}/>}
            {hourData&&<ScatterChartContainer data={hourData}  keyName='hr' titles={titles2} domainUrl={domainUrl}/>}
            {hourData&&<APPPieContainer data={hourData}  keyName='hr' titles={titles2} domainUrl={domainUrl}/>}
          </div>
        )
    }
}

export default ListInfoContainer;
