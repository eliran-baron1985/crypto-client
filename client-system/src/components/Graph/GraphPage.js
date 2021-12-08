import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Dashboard from "./Dashboard/Dashboard";
import { sendSymbolType, allowDataFlow } from "./GraphPages.action";
import { dates, requestedSymbols, historyCandles } from "../../utils/services/api";
import * as s from "../../store/selectors";
import BigGraph from "../../containers/Graph/BigGraph";
import OneMinClock from "../../features/clock/OneMinClock";
import FiveMinClock from "../../features/clock/FiveMinClock";
import FifteenMinClock from "../../features/clock/FifteenMinClock";
import OneHourClock from "../../features/clock/OneHourClock";
import OneDayClock from "../../features/clock/OneDayClock";
import { graphTypes } from "../../utils/helpers/config";
import { PacmanLoader } from "react-spinners";


class GraphPage extends Component {
  state = {
    graphType: ""
  };

  componentDidMount() {
    const { symbol } = this.props.match.params;
    const graphType = this.props.location.pathname.slice(7, 9);

    document.title = `${symbol} - ${graphType}`;

    // GET THE SYMBOL'S DATES FOR THE REPLAY
    if (graphType !== "1h" && graphType !== "15") {
      dates(symbol);
    }

    // SEND SYMBOL TO THE GLOBAL STORE
    this.props.doSendSymbolType(symbol);
    this.props.do_allowDataFlow(graphTypes[graphType], true);
    this.setState({ graphType: graphTypes[graphType] });

  }

  shouldComponentUpdate(nextProps) {
    const { symbol } = this.props.match.params;
    const graphType = this.props.location.pathname.slice(7, 9);

    if (this.props.isHistoryUpdate !== nextProps.isHistoryUpdate) {
      return true;
    }

    if (this.props.loadInitialData !== nextProps.loadInitialData) {
      const clientData = { symbol, tableName: graphType }

      requestedSymbols(clientData);

      if (!this.props.data) {
        this.loadHistory(symbol, graphType)
      }
    }
    return false;
  }

  componentWillUnmount() {
    const graphType = this.state.graphType;

    if (graphType) {
      this.props.do_allowDataFlow(this.state.graphType, false);
    }
  }

  loadHistory = (symbol, graphType) => {
    switch (graphType) {
      case "15":
        historyCandles({ symbol, timeType: "15" });
        break;
      case "1h":
        historyCandles({ symbol, timeType: "1h" });
        break;

      default:
        break;
    }
  };


  printGraph = (symbol, graphType) => {
    if (this.props.data) {
      switch (graphType) {
        case "01":
          return (
            <BigGraph
              symbol={symbol}
              graphType="minCandle"
              rangeType="minute"
              setMinute={1}
            />
          );
        case "05":
          return (
            <BigGraph
              symbol={symbol}
              graphType="fiveMinuteCandle"
              rangeType="minute"
              setMinute={5}
            />
          );
        case "15":
          return (
            <BigGraph
              symbol={symbol}
              graphType="fifteenMinuteCandle"
              rangeType="minute"
              setMinute={15}
            />
          );
        case "1h":
          return (
            <BigGraph
              symbol={symbol}
              graphType="hourCandle"
              rangeType="hour"
              setMinute={60}
            />
          );
        case "1d":
          return (
            <BigGraph
              symbol={symbol}
              graphType="dayCandle"
              rangeType="day"
              setMinute={1440}
            />
          );
        default:
          return (
            <ErrorBox>
              <ErrorMsg>No data yet, please wait or go back</ErrorMsg>
            </ErrorBox>
          );
      }
    }
  };

  printClock = graphType => {
    switch (graphType) {
      case "01":
        return <OneMinClock />;
      case "05":
        return <FiveMinClock />;
      case "15":
        return <FifteenMinClock />;
      case "1h":
        return <OneHourClock />;
      case "1d":
        return <OneDayClock />;
      default:
        break;
    }
  };

  render() {
    const { symbol } = this.props.match.params;
    const graphType = this.props.location.pathname.slice(7, 9);
    const data = this.props.data;

    return (
      <Container>
        <Dashboard type={graphType} symbol={symbol} />
        {!data && (<LoadingBox>
          <PacmanLoader color={"orange"} />
        </LoadingBox>)}
        {symbol && this.printGraph(symbol, graphType)}
        <FloatClock>{symbol && this.printClock(graphType)}</FloatClock>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { symbol } = ownProps.match.params;
  const graphType = ownProps.location.pathname.slice(7, 9);

  switch (graphType) {
    case "01":
      return {
        data: s.selectorMinCandle(state, symbol),
        isHistoryUpdate: s.selectorHistoryUpdateMinCandle(state),
        loadInitialData: s.selectorLoadInitialData(state)
      };
    case "05":
      return {
        data: s.selectorFiveMinuteCandle(state, symbol),
        isHistoryUpdate: s.selectorHistoryUpdateFiveMinuteCandle(state),
        loadInitialData: s.selectorLoadInitialData(state)
      };
    case "15":
      return {
        data: s.selectorFifteenMinuteCandle(state, symbol),
        isHistoryUpdate: s.selectorHistoryUpdateFifteenMinuteCandle(state),
        loadInitialData: s.selectorLoadInitialData(state)
      };
    case "1h":
      return {
        data: s.selectorHourCandle(state, symbol),
        isHistoryUpdate: s.selectorHistoryUpdateHourCandle(state),
        loadInitialData: s.selectorLoadInitialData(state)
      };
    case "1d":
      return {
        data: s.selectorDayCandle(state, symbol),
        isHistoryUpdate: s.selectorHistoryUpdateDayCandle(state),
        loadInitialData: s.selectorLoadInitialData(state)
      };
    default:
      break;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doSendSymbolType: symbol => dispatch(sendSymbolType(symbol)),
    do_allowDataFlow: (graphType, isActive) =>
      dispatch(allowDataFlow(graphType, isActive))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphPage);

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FloatClock = styled.div`
  position: absolute;
  top: 100px;
  left: 100px;
`;

const ErrorBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ErrorMsg = styled(ErrorBox)`
  font-size: 5rem;
  color: black;
`;

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
