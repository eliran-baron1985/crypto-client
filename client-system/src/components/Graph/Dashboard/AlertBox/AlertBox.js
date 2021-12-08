import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { showEventLocation } from "./AlertBox.actions";
import {
  selectorMinMarks,
  selectorFiveMinuteMarks,
  selectorFifteenMinuteMarks,
  selectorHourMarks,
  selectorDayMarks
} from "../../../../store/selectors";

const AlertBox = props => {
  const validation = val => {
    if (val) return val.name;
  }

  return (
    <Container>
      {props.marks !== undefined &&
        props.marks.map((val, i) => (
          <Box alt={val.date} key={i} onClick={() => props.do_showEventLocation(val)}>
            {validation(val)}
          </Box>
        ))}
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  switch (ownProps.type) {
    case "01":
      return {
        marks: selectorMinMarks(state, ownProps.symbol),
        isHistoryUpdate: state.app.isHistoryUpdate
      };
    case "05":
      return {
        marks: selectorFiveMinuteMarks(state, ownProps.symbol),
        isHistoryUpdate: state.app.isHistoryUpdate
      };
    case "15":
      return {
        marks: selectorFifteenMinuteMarks(state, ownProps.symbol),
        isHistoryUpdate: state.app.isHistoryUpdate
      };
    case "1h":
      return {
        marks: selectorHourMarks(state, ownProps.symbol),
        isHistoryUpdate: state.app.isHistoryUpdate
      };
    case "1d":
      return {
        marks: selectorDayMarks(state, ownProps.symbol),
        isHistoryUpdate: state.app.isHistoryUpdate
      };
    default:
      break;
  }
};

const mapDispatchToProps = dispatch => {
  return {
    do_showEventLocation: event => dispatch(showEventLocation(event))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertBox);

const Container = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;
  margin-left: 1rem;
`;
const Box = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  border: 1px solid lightgrey;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  margin-right: 0.5rem;
  &:hover {
    background-color: lightgrey;
    cursor: pointer;
  }
`;
