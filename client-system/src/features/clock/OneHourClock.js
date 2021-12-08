import React, { Component } from "react";
import * as S from "./clock.style";
import Draggable from "react-draggable";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.mEl = React.createRef(); // MINUTE HAND
    this.dateEl = React.createRef(); // DATE BOX
    this.typeEl = React.createRef(); // DAY BOX

    this.state = {
      digital: ""
    };
  }

  // GLOBAL VARIABLES FOR THE CLOCKS INTERVALS
  intervalAnalog = 0;
  intervalDigital = 0;

  componentDidMount() {
    // INITIAL START &&
    // UPDATE THE CLOCK EVERY 1 SECOND

    this.intervalAnalog = setInterval(this.analog, 1000);
    this.intervalDigital = setInterval(this.digital, 1000);
  }

  componentWillUnmount() {
    // ** FOR MEMORY LEAK **
    // REMOVE INTERVALS WHEN COMPONENTS IS UNMOUNT
    clearInterval(this.intervalDigital);
    clearInterval(this.intervalAnalog);
  }

  setDialLines = () => {
    //  (1MIN || 1H || 1 DAY), CREATE 60 DIAL LINES 1/60
    return this.createDialLines(60, 6);
  };

  // CREATE DIAL LINES
  createDialLines = (num, margin) => {
    const data = [];
    for (let i = 0; i < num; i++) {
      data.push(margin * i);
    }
    return data;
  };

  // PRINT DIAL LINES
  printDialLines = () => {
    const dialLines = this.setDialLines();

    return dialLines.map(line => (
      <S.DialLines key={line} style={{ transform: `rotate(${line}deg)` }} />
    ));
  };

  // SET DIGITAL CLOCK
  digital = () => {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();

    this.setState({
      digital: `${h}:${m}:${s}`
    });
  };

  // SET ANALOG CLOCK
  analog = () => {
    this.set1H();

    this.setDate();
  };

  set1H = () => {
    const mEl = this.mEl.current;
    let mDeg;

    // HIDE SECOND AND HOUR HAND
    mEl.style.transform = "rotate(" + mDeg + "deg)";

    this.setHandClockDegrees();
  };

  setDate = () => {
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let clockType = "1 HOUR";
    const dateEl = this.dateEl.current;
    const typeEl = this.typeEl.current;

    if (month < 9) {
      month = "0" + month;
    }

    dateEl.innerHTML = `${date}/${month}/${year}`;
    typeEl.innerHTML = clockType;
  };

  // SET CLOCK'S HANDS DEGREE
  setHandClockDegrees = () => {
    const mEl = this.mEl.current;
    let d = new Date();
    let m = d.getMinutes();

    let mDeg;

    // IN ORDER TO SET CLOCK'S HANDS DEGREE - WE MUST CALCULATE THE TIME:
    // 1. TIME / THE AMOUNT OF DIAL LINES
    // 2. TIMES 360 DEGREES OF A CIRCLE
    // 3. PLUS 180 DEGREES OF THE INITIAL CLOCK'S HANDS IS STARTED FROM
    mDeg = (m / 60) * 360 + 180;

    // SETTING THE CLOCK'S HANDS ELEMENT
    mEl.style.transform = "rotate(" + mDeg + "deg)";
  };

  render() {
    return (
      <Draggable>
        <S.Container>
          <S.Analog>
            <div>
              <S.DateBox ref={this.dateEl} />
              <S.TypeBox ref={this.typeEl} />
            </div>
            <S.Dot />
            <div>
              <S.MinuteHand ref={this.mEl} />
            </div>
            <S.DialLines />
            {this.printDialLines()}
          </S.Analog>
          <S.Digital>{this.state.digital}</S.Digital>
        </S.Container>
      </Draggable>
    );
  }
}

export default Clock;
