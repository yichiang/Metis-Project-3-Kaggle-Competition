import React, { Component } from "react";
import { Button, Card, Image, Header, Table, Rating } from "semantic-ui-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import $ from "jquery";
import * as d3 from "d3";
import "../../App.css";
import { withFauxDOM } from "react-faux-dom";

// var tool_tip_el;
// var div_tooltip;
class HourLineChartContainer extends Component {
  state = { toogleTooltip: true };
  constructor(props) {
    super(props);
    this.getChart = this.getChart.bind(this);
  }

  componentDidMount() {
    this.getChart(this.props.data);
  }
  // getChart(data) {
  //   // set the dimensions and margins of the graph
  //   var margin = { top: 20, right: 20, bottom: 30, left: 50 },
  //     width = 960 - margin.left - margin.right,
  //     height = 500 - margin.top - margin.bottom;
  //   var x = d3.scaleTime().range([0, width]);
  //   var y = d3.scaleLinear().range([height, 0]);
  //   // define the line
  //   var parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");
  //   data.forEach(function(d) {
  //     d.hr = parseTime(d.hr);
  //   })
  //   console.log("data!!!!!", data)
  //
  //   var valueline = d3
  //     .line()
  //     .x(function(d) {
  //       return x(d.hr);
  //     })
  //     .y(function(d) {
  //       return y(d.record_count);
  //     });
  //
  //   const el = this.props.connectFauxDOM("div", "chart");
  //
  //   let svg = d3
  //     .select(el)
  //     .append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //     .append("g")
  //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  //
  //   x.domain(
  //     d3.extent(data, function(d) {
  //       return d.hr;
  //     })
  //   );
  //   y.domain([
  //     0,
  //     d3.max(data, function(d) {
  //       return d.record_count;
  //     })
  //   ]);
  //   // Add the valueline path.
  //   svg
  //     .append("path")
  //     .data([data])
  //     .attr("class", "line")
  //     .attr("d", valueline);
  //   // Add the X Axis
  //   svg
  //     .append("g")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(d3.axisBottom(x));
  //   // Add the Y Axis
  //   svg.append("g").call(d3.axisLeft(y));
  // }

  render() {
    return (
        <div className="scrollChart">
          <Header as="h2">
            A
            <Header.Subheader>
              It helps us to see app dowload rate
            </Header.Subheader>
          </Header>
          {this.props.chart}
        </div>

    );
  }
}
HourLineChartContainer.defaultProps = {
  chart: "loading",
  tooltip: "loading"
};
// export default ScatterChartContainer;
export default withFauxDOM(HourLineChartContainer);
