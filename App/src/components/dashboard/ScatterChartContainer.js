import React, {Component } from 'react';
import { Button, Card, Image, Header, Table, Rating  } from 'semantic-ui-react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import $ from 'jquery'
import * as d3 from 'd3'
import '../../App.css';
import {withFauxDOM} from 'react-faux-dom';
import moment from 'moment'

class ScatterChartContainer extends Component {
  state = { }
  constructor(props) {
    super(props);
    this.getChart=this.getChart.bind(this)
  }


  componentDidMount() {
    this.getChart(this.props.data)
  }

    getChart(data,div_tooltip){
      var keyName = this.props.keyName
      //Source:https://bl.ocks.org/mbostock/3887118
      var margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      var x = d3.scaleLinear()
          .range([0, width]);

      var y = d3.scaleLinear()
          .range([height, 0]);

      var color = d3.scaleOrdinal(d3.schemeCategory10);

      var xAxis = d3.axisBottom(x);

      var yAxis = d3.axisLeft(y);


      const el = this.props.connectFauxDOM('div', 'chart')

      let svg = d3.select(el).append('svg')
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



        x.domain(d3.extent(data, function(d) { return d.record_count; })).nice();
        y.domain(d3.extent(data, function(d) { return d.dowload_count; })).nice();

        svg.append("text")
          .attr("class", "x label")
          .attr("text-anchor", "end")
          .attr("x", width -50)
          .attr("y", height - 6)
          .text("Total Record");

        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 6)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text('Dowload Count');

        svg.append("text")
             .attr("class", "title")
             .attr("x", 10)
             .attr("y", -26)
             .text("Why Are We Leaving Facebook?");


        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)


        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var self=this;
        svg.selectAll(".dot")
            .data(data)
          .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", function(d) { return x(d.record_count); })
            .attr("cy", function(d) { return y(d.dowload_count); })
            .style("fill", function(d) {
              var temp_c = '';
              if(d[keyName] == 'hr'){
                temp_c = color(moment(d[keyName]).hour())
              }else{
                temp_c= color(d[keyName])
              }
              return temp_c;
            })



    }

  render() {
    console.log("props",this.props)
    const {keyName, titles} =this.props
        return (
          <div>
            <div  className='scrollChart'>
              <Header as='h2'>
                  {titles[0].mainTitle}
                  <Header.Subheader>
                    {titles[0].subTItle}
                  </Header.Subheader>
                </Header>
            {this.props.chart}
            </div>

            {this.props.data&&<div className='scrollChart'>
              <Header as='h2'>
                {titles[1].mainTitle}
                  <Header.Subheader>
                    {titles[1].subTItle}
                  </Header.Subheader>
                </Header>
                <BarChart width={2000} height={300} data={this.props.data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <CartesianGrid strokeDasharray="3 3"/>
                 <XAxis dataKey={keyName}/>
                 <YAxis/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="record_count" fill="#bf40bf" />
                 <Bar dataKey="dowload_count" fill="#33cc00" />
              </BarChart>
            </div>}
        </div>
        )
    }
}
ScatterChartContainer.defaultProps = {
  chart: 'loading',
  tooltip:'loading'
}
// export default ScatterChartContainer;
export default withFauxDOM(ScatterChartContainer)
