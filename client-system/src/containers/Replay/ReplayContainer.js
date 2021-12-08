import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Replay from "../../components/Graph/Dashboard/Replay/Replay";
import { filter_duplicates } from "../../utils/helpers/filter_duplicates";
import { historyCandles } from "../../utils/services/api";
import {
  selectorRecordedDates,
  selectorSymbolType
} from "../../store/selectors";

class ReplayContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: null,
      isLoading: true,
      startDate: null,
      endDate: null,
      type: ""
    };
  }

  componentDidMount() {
    const { recordedDates } = this.props;

    if (recordedDates !== undefined) {
      this.updateData(recordedDates);
    }
  }

  componentDidUpdate(prevProps) {
    const currentData = this.props.recordedDates;
    const prevData = prevProps.recordedDates;

    if (prevData === undefined && currentData !== undefined) {
      return this.updateData(currentData);
    }
  }

  updateData = data => {
    if (data === undefined) {
      return false;
    }

    let dates = [];

    dates = data.map(date => {
      if (date.length > 10) {
        return moment(date).format("DD/MM/YYYY");
      } else {
        return date;
      }
    });

    const filteredList = filter_duplicates(dates);

    this.setState({
      isLoading: false,
      dates: filteredList,
      startDate: filteredList[0],
      endDate: filteredList[0]
    });
  };

  onSelectDate = (date, type) => {
    switch (type) {
      case "start":
        this.setState({ startDate: date });
        break;
      case "end":
        this.setState({ endDate: date });
        break;

      default:
        break;
    }
  };

  sendDate = actionType => {
    // get the client choosen dates
    const { dates, startDate, endDate } = this.state;
    let slicedDates = [];

    // get the time type of history, Exp: "1h" will be equals to "historyHour"
    const timeType = this.props.type;

    // get the symbol type, Exp: "EURUSD"
    const symbol = this.props.symbol_type;

    // get the current date
    const today = new Date();
    const todayInstance = new Date();

    // calc the days before
    const yesterday = new Date(todayInstance.setDate(today.getDate() - 1));
    const twoDaysBefore = new Date(todayInstance.setDate(today.getDate() - 2));

    // convert the date to the DB date type - "DD-MM-YYYY"
    const formatedToday = moment(today).format("DD-MM-YYYY");
    const formatedYesterday = moment(yesterday).format("DD-MM-YYYY");
    const formatedTwoDaysBefore = moment(twoDaysBefore).format("DD-MM-YYYY");

    // find the index of the relevant dates
    const indexOfStartDate = dates.findIndex(el => el === startDate);
    const indexOfEndDate = dates.findIndex(el => el === endDate);

    // loop over the dates using moment between dates
    if (indexOfStartDate === indexOfEndDate) {
      slicedDates = dates.slice(indexOfStartDate, indexOfStartDate + 1);
    } else {
      slicedDates = dates.slice(indexOfStartDate, indexOfEndDate + 1);
    }

    // make a request object with the relevant data
    const request = {
      dates: [],
      symbol,
      timeType
    };

    // if the request is "lastCandles" - ask for the last 70 candles
    if (actionType === "lastCandles") {
      switch (timeType) {
        case "01":
          request.dates.push(formatedToday);

          historyCandles(request);
          break;
        case "05":
          request.dates.push(formatedToday);
          historyCandles(request);
          break;
        case "15":
          request.dates.push(formatedToday);
          historyCandles(request);
          break;
        case "1h":
          request.dates.push(
            formatedToday,
            formatedYesterday,
            formatedTwoDaysBefore
          );

          historyCandles(request);

          break;
        case "1d":
          request.dates.push(formatedToday);
          historyCandles(request);
          break;

        default:
          break;
      }
    } else if (actionType === "dateToDate") {
      // ***waiting for the implementation in the server for getting date as an array***
      request.dates = slicedDates;
      historyCandles(request);

      // slicedDates.forEach(date => {
      //   request.dates = date;
      //   console.log("date: ", date);
      // });
    }
  };

  render() {
    const { dates, isLoading } = this.state;

    return (
      <Replay
        dates={dates}
        isLoading={isLoading}
        onSelectDate={(date, type) => this.onSelectDate(date, type)}
        sendDate={this.sendDate}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    recordedDates: selectorRecordedDates(state),
    symbol_type: selectorSymbolType(state)
  };
}

export default connect(mapStateToProps)(ReplayContainer);
