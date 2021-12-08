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

  setDialLines = type => {
    if (type === 5) return this.createDialLines(5, 72);

    return this.createDialLines(60, 6);
  };

  // CREATE DIAL LINES
  createDialLines = (num, margin) => {
    const data = [];
    for (let i = 1; i < num; i++) {
      data.push(margin * i);
    }
    return data;
  };

  // PRINT DIAL LINES
  printDialLines = (type) => {
    const dialLines = this.setDialLines(type);

    return dialLines.map(line => (
      <S.DialLines_short key={line} style={{ transform: `rotate(${line}deg)` }} />
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
    this.set5Min();

    this.setDate();
  };

  set5Min = () => {
    const mEl = this.mEl.current;
    let d = new Date();
    let m = d.getMinutes();
    let mDeg;

    // CHECK HOW MUCH IS LEFT FOR COMPLETING 5 MIN ROUND
    // let leftToCompleteTheRound = m % 5;

    // IN ORDER TO SET MINUTE HAND CLOCK - WE MUST CALCULATE MINUTE DEGREE:
    // 1. THE TIME TO COMPLETE THE 5 MIN ROUND / 5
    // 2. TIMES 360 DEGREES OF A CIRCLE
    // 3. PLUS 180 DEGREES OF THE INITIAL HAND CLOCK IS STARTED FROM
    // mDeg = (leftToCompleteTheRound / 5) * 360 + 180;
    let leftToCompleteTheRound = m % 5;
    // IN ORDER TO SET CLOCK'S HANDS DEGREE - WE MUST CALCULATE THE TIME:
    // 1. TIME / THE AMOUNT OF DIAL LINES
    // 2. TIMES 360 DEGREES OF A CIRCLE
    // 3. PLUS 180 DEGREES OF THE INITIAL CLOCK'S HANDS IS STARTED FROM
    mDeg = (leftToCompleteTheRound / 5) * 360 + 180;

    mEl.style.transform = "rotate(" + mDeg + "deg)";
  };
  setDate = () => {
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let clockType = "5 MIN";
    const dateEl = this.dateEl.current;
    const typeEl = this.typeEl.current;

    if (month < 9) {
      month = "0" + month;
    }

    dateEl.innerHTML = `${date}/${month}/${year}`;
    typeEl.innerHTML = clockType;
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
            <div>
              <S.H01>1</S.H01>
              <S.H02>2</S.H02>
              <S.H03>3</S.H03>
              <S.H04>4</S.H04>
              <S.H05>5</S.H05>
            </div>
            <S.DialLines />
            {this.printDialLines(1)}
            {this.printDialLines(5)}
          </S.Analog>
          <S.Digital>{this.state.digital}</S.Digital>
        </S.Container>
      </Draggable>
    );
  }
}

export default Clock;
