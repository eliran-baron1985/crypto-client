import React, { Component } from "react";
import AnyChart from "anychart-react";
import anychart from "anychart";
import styled from "styled-components";
import dateformat from "dateformat";
import { create_chart_marks } from "../../utils/helpers/create_chart_marks";
import { connect } from "react-redux";
import * as s from "../../store/selectors";
import * as action from "../../components/Graph/Dashboard/Paint/Paint.actions";
import * as drawing from "../../features/Graph/drawing";
import graphSetup from "./graphSetup";


class BigGraph extends Component {
  state = {
    chart: null,
    mapping: null,
    dataTable: null
  };

  componentDidMount() {
    const { candles, events } = this.props;
    const graphSettings = graphSetup(anychart, candles, events);

    this.setState(
      {
        chart: graphSettings.chart,
        mapping: graphSettings.mapping,
        dataTable: graphSettings.dataTable
      },
      () => this.afterInitialSetting()
    );
  }

  componentWillUnmount() {
    if (this.state.chart) {
      this.state.chart.removeAllListeners();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { chart } = this.state;
    const {
      do_drawLine,
      do_drawCross,
      do_drawAngle,
      do_removeSelected,
      do_changeGraphRange,
      do_removeAll,
      drawAngle,
      drawLine,
      drawCross,
      changeGraphRange,
      removeSelected,
      removeAll,
      otherDrawing,
      minCandles,
      eventLocation,
      events,
      graphType
    } = this.props;

    if (chart !== nextState.chart) return true;

    if (nextProps.eventLocation) {
      if (eventLocation !== nextProps.eventLocation) {
        drawing.changeGraphRange(
          chart,
          "event",
          graphType,
          nextProps.eventLocation
        );
      }
    }

    if (otherDrawing !== nextProps.otherDrawing) {
      drawing.otherDrawing(nextProps.otherDrawing, chart);
    }

    if (drawAngle !== nextProps.drawAngle) {
      if (nextProps.drawAngle) {
        drawing.drawAngle(chart);
        do_drawAngle(false);
      }
    }

    if (drawLine !== nextProps.drawLine) {
      if (nextProps.drawLine) {
        drawing.drawLine(chart);
        do_drawLine(false);
      }
    }

    if (drawCross !== nextProps.drawCross) {
      if (nextProps.drawCross) {
        drawing.drawCross(chart);
        do_drawCross(false);
      }
    }

    if (changeGraphRange !== nextProps.changeGraphRange) {
      if (nextProps.changeGraphRange) {
        drawing.changeGraphRange(chart, "R", graphType);
        do_changeGraphRange(false);
      }
    }

    if (removeAll !== nextProps.removeAll) {
      if (nextProps.removeAll) {
        drawing.removeAll(chart);
        do_removeAll(false);
      }
    }

    if (removeSelected !== nextProps.removeSelected) {
      if (nextProps.removeSelected) {
        drawing.removeSelected(chart);
        do_removeSelected(false);
      }
    }

    if (this.state.dataTable) {
      if (nextProps.candles) {
        this.updateData(nextProps.candles);

        if (nextProps.events) {
          if (!events) {
            this.updateEvents(chart, nextProps.events);
          } else {
            if (nextProps.events.length !== events.length) {
              this.updateEvents(chart, nextProps.events);
            }
          }
        }
      }

      if (minCandles && nextProps.minCandles) {
        if (nextProps.minCandles[nextProps.minCandles.length - 1]) {
          const timeNext =
            nextProps.minCandles[nextProps.minCandles.length - 1].time;
          const time = minCandles[minCandles.length - 1].time;

          if (time !== timeNext) {
            this.updateData(nextProps.minCandles, "minCandles");
          }
        }
      }
    }

    return false;
  }

  afterInitialSetting = () => {
    const chart = this.state.chart;
    const rangeType = this.props.rangeType;
    const chartEl = document.getElementById("ac-chart-container");

    // SELECT GRAPH RANGE
    chart.selectRange("hour", 16, "last-date");

    // SET BOUNDS
    if (chartEl) {
      chartEl.style.width = "100%";
      chartEl.style.height = "100%";
    }

    var scale = chart.xScale();

    scale.ticks([
      {
        minor: { unit: rangeType, count: 1 },
        major: { unit: rangeType, count: 1 }
      }
    ]);
  };

  // --------- update candles ---------
  updateData = (data, type) => {
    const newData = [...data].sort(this.sortByTime);
    const lastCandle = newData[newData.length - 1];
    const graphType = this.props.graphType;
    const mins = new Date().getMinutes();

    if (lastCandle && mins % 15 !== 0 && mins !== 0 && mins !== 1) {
      if (type === "minCandles" && graphType !== "minCandle") {
        const newSecDate = this.convertDate();

        const newLastSecCandle = {
          ...lastCandle,
          date: newSecDate
        };

        delete newLastSecCandle.avgBlue;
        delete newLastSecCandle.avgBrown;
        delete newLastSecCandle.avgBlack;
        delete newLastSecCandle.avgOrange;
        delete newLastSecCandle.avgPurple;

        console.log("newLastSecCandle: ", newLastSecCandle)
        this.state.dataTable.addData([newLastSecCandle]);
      } else {
        this.state.dataTable.addData([lastCandle]);
      }
    }
  };

  // --------- update events ---------
  updateEvents = (chart, marks) => {
    if (chart) {
      let events = [...marks];
      const plot = chart.plot(0);

      const helper = {
        plot,
        events
      };

      create_chart_marks(helper);
    }
  };

  convertDate = () => {
    const data = this.props.candles;
    const lastCandle = data[data.length - 1];
    const validDate = this.convertToValidDate(lastCandle.date);
    const date = new Date(validDate);
    const miliSecondsDate = date.setMinutes(
      date.getMinutes() + this.props.setMinute
    );
    const newDate = dateformat(new Date(miliSecondsDate), "dd-mm-yyyy HH:MM");

    return newDate;
  };

  convertToValidDate = date => {
    const partA = `${date.slice(0, 2)}`;
    const partB = `${date.slice(3, 5)}`;

    const newDate = date.replace(partB, partA);
    const newDate2 = newDate.replace(partA, partB);

    return newDate2;
  };

  sortByTime = (a, b) => {
    const dateA = this.convertToValidDate(a.date);
    const dateB = this.convertToValidDate(b.date);

    return new Date(dateA) - new Date(dateB);
  };

  render() {
    const { chart, mapping } = this.state;
    const firstCandle = this.props.candles[0] || [];

    return (
      <Container
        onWheel={e => drawing.handleWheel(e, chart, mapping, firstCandle)}
      >
        {chart && (
          <AnyChart width="100%" height="100%" instance={chart} />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { symbol, graphType } = ownProps;

  return {
    candles: s.selectorDataType(state, symbol, graphType, "current"),
    events: s.selectorDataType(state, symbol, graphType, "events"),
    minCandles: s.selectorMinCandle(state, symbol, graphType),
    drawAngle: s.selectorDrawAngle(state, symbol),
    drawLine: s.selectorDrawLine(state, symbol),
    drawCross: s.selectorDrawCross(state, symbol),
    changeGraphRange: s.selectorChangeGraphRange(state, symbol),
    removeSelected: s.selectorRemoveSelected(state, symbol),
    removeAll: s.selectorRemoveAll(state, symbol),
    otherDrawing: s.selectorOtherDrawing(state, symbol),
    eventLocation: s.selectorEventLocation(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    do_drawAngle: isClicked => dispatch(action.drawAngle(isClicked)),
    do_drawLine: isClicked => dispatch(action.drawLine(isClicked)),
    do_drawCross: isClicked => dispatch(action.drawCross(isClicked)),
    do_changeGraphRange: isClicked =>
      dispatch(action.changeGraphRange(isClicked)),
    do_removeSelected: isClicked => dispatch(action.removeSelected(isClicked)),
    do_removeAll: isClicked => dispatch(action.removeAll(isClicked)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BigGraph);

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid #7693fc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`;
