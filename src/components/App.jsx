import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/App.css";
import moment from "moment";
import {
  ComposedChart,
  ResponsiveContainer,
  LineChart,
  Bar,
  ReferenceLine,
  Line,
  XAxis,
  YAxis,
  Area,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
require("es6-promise").polyfill();
require("isomorphic-fetch");

class CustomTooltip1 extends Component {
  render() {
    const { active } = this.props;
    if (active) {
      const { payload, label } = this.props;

      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: 5,
            border: "1px solid #ccc"
          }}
        >
          Dag: {label}<hr />
          <p>Cumulatief: {`${Math.round(payload[0].value)} km.`}</p>
          <p>Benodigd: {`${Math.round(payload[1].value)} km.`}</p>
        </div>
      );
    }
    return null;
  }
}

class CustomTooltip2 extends Component {
  render() {
    const { active } = this.props;
    if (active) {
      const { payload, label } = this.props;

      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: 5,
            border: "1px solid #ccc"
          }}
        >
          Dag: {label}<hr />
          <p>Dagtotaal: {`${Math.round(payload[0].value)} km.`}</p>
        </div>
      );
    }
    return null;
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      chartHeight: null,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight
    };
  }
  componentWillMount() {
    const chartHeight = document.getElementById("progress_chart").dataset
      .chartHeight;
    this.setState({
      chartHeight: Number(chartHeight)
    });
  }
  componentDidMount() {
    fetch("/api/progress-chart")
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data
        });
      });

    window.addEventListener("resize", () => {
      this.setState({
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
      });
    });
  }

  render() {
    if (!this.state.data) {
      return <div />;
    }
    const { data } = this.state;

    return (
      <div>
        <ResponsiveContainer width="100%" height={Math.floor(this.state.chartHeight/2)}>
          <ComposedChart
            width={700}
            height={275}
            data={data.chart}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <Line
              type="monotone"
              dataKey="required"
              stroke="#ccc"
              strokeWidth="2"
              dot={false}
            />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis
              tickFormatter={tick => {
                return `${tick}`;
              }}
              dataKey="day_number"
            />
            <YAxis
              tickFormatter={tick => {
                return `${parseInt(tick)} km`;
              }}
              hide={(this.state.chartHeight > 500) ? false : true}
              domain={[0, 40075]}
              dataKey="required"
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip1 />} />
            <Area
              type="monotone"
              dataKey="done_cumulative"
              fill="url(#colorUv)"
              stroke="#8884d8"
            />
            <ReferenceLine
              x={data.current_day_number}
              stroke="red"
              // label={`${moment().locale('nl').format("D MMMM YYYY")}`}
            />

          </ComposedChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={Math.floor(this.state.chartHeight/2)}>
          <ComposedChart
            width={700}
            height={275}
            data={data.chart}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis
              tickFormatter={tick => {
                return `${tick}`;
              }}
              dataKey="day_number"
            />
            <YAxis
              hide={(this.state.chartHeight > 500) ? false : true}
              dataKey="done_this_day"
            />
            <ReferenceLine
              y={data.required_distance_per_day}
              stroke="red"
            />

            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip2 />} />
            <Bar dataKey="done_this_day" barSize={20} fill="url(#colorUv)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default App;
