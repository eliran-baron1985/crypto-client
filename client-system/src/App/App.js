import React, { Component } from "react";

import styled from "styled-components";
import GlobalStyle from "../styles/global/global.styles";

import { Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import * as s from "../store/selectors";

import {
  getRecordedDates,
  getRealtimeData,
  getHistoryData,
  getTrades
} from "./App.actions";

import * as api from "../utils/services/api";
import GraphPage from "../components/Graph/GraphPage";


class App extends Component {
  state = {
    allowMinCandle: false,
    allowFiveMinCandle: false,
    allowFifteenMinCandle: false,
    allowHourCandle: false,
    allowDayCandle: false
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.loadInitialData !== nextProps.loadInitialData) {
      this.subscribeToSocketio();
      return false;
    }
    // console.log("should, ", nextProps.allowHourCandle)
    return true;
  }


  componentDidUpdate(prevProps) {
    if (prevProps.reconnectSocket !== this.props.reconnectSocket) {
      this.subscribeToSocketio();
    }

    // update if streaming data is allowed
    Object.keys(this.state).map(key => {
      console.error("conect now ClientSystem")
      console.log("key: ", key)
      console.log("state: ", this.state[key])
      console.log("props: ", this.props[key])
      if (key.includes("allow") && this.state[key] !== this.props[key]) {
        this.setState({
          [key]: this.props[key]
        });

      }
      return true;
    });
  }

  // EVERY PUSH OF DATA FROM THE SERVER, UPDATE THE GLOBAL STATE WITH THE NEW DATA
  subscribeToSocketio = () => {
    api.getDataToGlobalStore(this.updateGlobalState);
    api.getTrades(this.getTrades);
  };

  getSymbolsEvents = (err, data) => {
    this.props.do_getSymbolsEvents(data);
  };

  getTrades = (err, data) => {
    this.props.do_getTrades(data);
  };

  // SAVE THE DATA TO THE GLOBAL STATE (REDUX STORE)
  updateGlobalState = (err, data) => {
    const {
      allowFiveMinCandle,
      allowFifteenMinCandle,
      allowHourCandle,
      allowDayCandle
    } = this.state;

    const {
      do_getRecordedDates,
      do_getHistoryData,
      do_getRealtimeData
    } = this.props;


    switch (data.id) {
      case 2:
        do_getHistoryData(data, "minCandle");
        break;
      case 3:
        do_getHistoryData(data, "fiveMinuteCandle");
        break;
      case 4:
        console.log("history 15: ", data)
        do_getHistoryData(data, "fifteenMinuteCandle");
        break;
      case 5:
        console.log("history hour: ", data)
        do_getHistoryData(data, "hourCandle");
        break;
      case 6:
        do_getHistoryData(data, "dayCandle");
        break;
      case 7:
        do_getRecordedDates(data);
        break;
      case 10:
        console.log("real-time: ", data)
        console.log("allowHourCandle: ", allowHourCandle)
        do_getRealtimeData(data, "minCandle");
        break;
      case 11:
        if (allowFiveMinCandle) do_getRealtimeData(data, "fiveMinuteCandle");
        break;
      case 12:
        console.log("real-time 15: ", data)
        if (allowFifteenMinCandle) do_getRealtimeData(data, "fifteenMinuteCandle");
        break;
      case 13:
        //todo: allow
        console.log("real-time 1h: ", data)
        do_getRealtimeData(data, "hourCandle");
        break;
      case 14:
        if (allowDayCandle) do_getRealtimeData(data, "dayCandle");
        break;

      default:
    }
  };

  render() {
    return (
      <Wrapper>
        <GlobalStyle />

        <Router>
          <Route path="/graph/01/:symbol" component={GraphPage} />
          <Route path="/graph/05/:symbol" component={GraphPage} />
          <Route path="/graph/15/:symbol" component={GraphPage} />
          <Route path="/graph/1h/:symbol" component={GraphPage} />
          <Route path="/graph/1d/:symbol" component={GraphPage} />
        </Router>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    reconnectSocket: state.app.reconnectSocket,
    allowMinCandle: s.selectorAllowDataFlowMin(state),
    allowFiveMinCandle: s.selectorAllowDataFlowFive(state),
    allowFifteenMinCandle: s.selectorAllowDataFlowFifteen(state),
    allowHourCandle: s.selectorAllowDataFlowHour(state),
    allowDayCandle: s.selectorAllowDataFlowDay(state),
    loadInitialData: s.selectorLoadInitialData(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    do_getRecordedDates: data => dispatch(getRecordedDates(data)),

    do_getRealtimeData: (data, graphType) =>
      dispatch(getRealtimeData(data, graphType)),

    do_getHistoryData: (data, graphType) =>
      dispatch(getHistoryData(data, graphType)),

    do_getTrades: data => dispatch(getTrades(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0.5rem 1rem;
  overflow: hidden;
`;
