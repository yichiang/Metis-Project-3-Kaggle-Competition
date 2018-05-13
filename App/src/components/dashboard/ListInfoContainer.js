import React, {Component } from 'react';
import { Button, Card, Image, Header, Table, Rating  } from 'semantic-ui-react'
import $ from 'jquery'
import * as d3 from 'd3'
import '../../App.css';

class ReportContainer extends Component {
  state = { lastUpdated:'1/1/2019'}
  constructor(props) {
    super(props);
    this.getChart = this.getChart.bind(this)

  }
  componentDidMount() {
    var url = 'http://127.0.0.1:5000/api/data';
    $.ajax({
       url: url,
       type: "GET",
       dataType: 'json',
       success: function (data) {
         console.log(data)
         this.getChart(data)
         // this.setState({result: data});
       }.bind(this)
     });
  }

  getChart(data){

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

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      console.log("data!!!",data)
    x.domain(d3.extent(data, function(d) { return d.age; })).nice();
    y.domain(d3.extent(data, function(d) { return d.year; })).nice();

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Sepal Width (cm)");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Sepal Length (cm)")

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.age); })
        .attr("cy", function(d) { return y(d.year); })
        .style("fill", function(d) { return color(d.survived); });

    var legend = svg.selectAll(".legend")
        .data(color.domain())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });



    }




  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const {lastUpdated} = this.state;
        return (
          <div>
            <canvas width="960" height="500"></canvas>
          </div>
        )
    }
}

export default ReportContainer;
