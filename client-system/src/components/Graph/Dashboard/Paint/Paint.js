import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  drawAngle,
  drawLine,
  changeGraphRange,
  removeSelected,
  removeAll,
  otherDrawing,
  drawCross
} from "./Paint.actions";

class Paint extends Component {
  handleDrawing = drawingType => {
    this.props[`do_${drawingType}`](true);
  };

  handleOtherDrawing = drawingType => {
    this.props.do_otherDrawing(drawingType);
  };

  render() {
    return (
      <Box>
        <Select
          onChange={e => this.handleOtherDrawing(e.target.value)}
          onFocus={e => this.handleOtherDrawing(e.target.value)}
          defaultValue="default"
        >
          <Option value="default" disabled>
            Annotation Type
          </Option>
          <Option value="andrews-pitchfork">Andrews' Pitchfork</Option>
          <Option value="ellipse">Ellipse</Option>
          <Option value="fibonacci-arc">Fibonacci Arc</Option>
          <Option value="fibonacci-fan">Fibonacci Fan</Option>
          <Option value="fibonacci-retracement">Fibonacci Retracement</Option>
          <Option value="fibonacci-timezones">Fibonacci Time Zones</Option>
          <Option value="horizontal-line">Horizontal Line</Option>
          <Option value="infinite-line">Infinite Line</Option>
          <Option value="marker">Marker</Option>
          <Option value="ray">Ray</Option>
          <Option value="rectangle">Rectangle</Option>
          <Option value="trend-channel">Trend Channel</Option>
          <Option value="triangle">Triangle</Option>
          <Option value="vertical-line">Vertical Line</Option>
        </Select>
        <Button onClick={() => this.handleDrawing("drawLine")}>Draw</Button>
        <Button onClick={() => this.handleDrawing("drawCross")}>Cross</Button>
        <Button onClick={() => this.handleDrawing("drawAngle")}>Angle</Button>
        <Button onClick={() => this.handleDrawing("changeGraphRange")}>R</Button>
        <Button onClick={() => this.handleDrawing("removeSelected")}>
          R Selected
        </Button>
        <Button onClick={() => this.handleDrawing("removeAll")}>R ALL</Button>
      </Box>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    do_drawAngle: isClicked => dispatch(drawAngle(isClicked)),
    do_drawLine: isClicked => dispatch(drawLine(isClicked)),
    do_drawCross: isClicked => dispatch(drawCross(isClicked)),
    do_changeGraphRange: isClicked => dispatch(changeGraphRange(isClicked)),
    do_removeSelected: isClicked => dispatch(removeSelected(isClicked)),
    do_removeAll: isClicked => dispatch(removeAll(isClicked)),
    do_otherDrawing: type => dispatch(otherDrawing(type))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Paint);

const Box = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Button = styled.button``;

const Select = styled.select`
  margin-right: 1rem;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid lightgrey;
`;
const Option = styled.option`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid lightgrey;
`;
