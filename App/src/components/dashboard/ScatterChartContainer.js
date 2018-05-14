import React, {Component } from 'react';
import { Button, Card, Image, Header, Table, Rating  } from 'semantic-ui-react'
import $ from 'jquery'
import * as d3 from 'd3'
import '../../App.css';
import {withFauxDOM} from 'react-faux-dom';

// var tool_tip_el;
// var div_tooltip;
class ScatterChartContainer extends Component {
  state = { toogleTooltip: true}
  constructor(props) {
    super(props);
    this.getChart=this.getChart.bind(this)
  }


  componentDidMount() {
    // this.createToolTip()
  // const tool_tip_el = this.props.connectFauxDOM('div','tooltip');
  //   //
  //   var div_tooltip = d3.select(tool_tip_el).append("div")
  //                 .attr("class", "tooltip")
  //                 .style("width", '100px')
  //                 .style("height", '200px')
  //                 .style("background", 'blue')
  //                 .style("opacity", .10);
    this.getChart(this.props.data)
  }
  //
  // onMoveHover(d, div_tooltip){
  //   console.log("hover", d, div_tooltip)
  //   if(div_tooltip)
  //   {
  //     div_tooltip.transition()
  //       .duration(200)
  //       .style("width", '100px')
  //       .style("height", '200px')
  //       .style("background", 'blue')
  //       .style("opacity", .9);
  //
  //     div_tooltip.html(d.app + "<br/>" + d.record_count)
  //       .style("left", (d3.event.pageX) + "px")
  //       .style("top", (d3.event.pageY - 28) + "px")
  //
  //       this.setState({toogleTooltip:!this.state.toogleTooltip})
  //   }
  //
  // }


    getChart(data,div_tooltip){
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
            .style("fill", function(d) { return color(d.app); })
            // .on("mouseover", (d)=>this.onMoveHover(d, div_tooltip))
            //     .on("mouseout", function(d) {
            //         if(div_tooltip)
            //         {
            //           div_tooltip.transition()
            //             .duration(500)
            //             .style("opacity", 0);
            //         }
            //       });


    }

  render() {
    console.log("props",this.props)
        return (
          <div id="vis-container">
            {this.props.chart}
            {/* {this.state.toogleTooltip && this.props.tooltip} */}
            {/* {this.props.tooltip} */}
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
