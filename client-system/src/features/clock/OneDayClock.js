import React, { Component } from "react";
import * as S from './clock.style';
import Draggable from "react-draggable";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.hEl = React.createRef(); // HOUR HAND
    this.mEl = React.createRef(); // MINUTE HAND
    this.sEl = React.createRef(); // SECOND HAND
    this.h3 = React.createRef(); // TITLE HOUR 3
    this.h6 = React.createRef(); // TITLE HOUR 6
    this.h9 = React.createRef(); // TITLE HOUR 9
    this.h12 = React.createRef(); // TITLE HOUR 12
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
    for (let i = 1; i < num; i++) {
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
    this.setADay();

    this.setDate();
  };
  setADay = () => {
    const h3 = this.h3.current;
    const h6 = this.h6.current;
    const h9 = this.h9.current;
    const h12 = this.h12.current;

    // SHOW HOUR TITLES
    h3.style.display = "inline-block";
    h6.style.display = "inline-block";
    h9.style.display = "inline-block";
    h12.style.display = "inline-block";
    this.setHandClockDegrees();
  };

  setDate = () => {
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let clockType = "1 DAY";
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
    const sEl = this.sEl.current;
    const hEl = this.hEl.current;
    const mEl = this.mEl.current;
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let hDeg;
    let mDeg;
    let sDeg;

    // IN ORDER TO SET CLOCK'S HANDS DEGREE - WE MUST CALCULATE THE TIME:
    // 1. TIME / THE AMOUNT OF DIAL LINES
    // 2. TIMES 360 DEGREES OF A CIRCLE
    // 3. PLUS 180 DEGREES OF THE INITIAL CLOCK'S HANDS IS STARTED FROM
    hDeg = (h / 12) * 360 + 180;
    mDeg = (m / 60) * 360 + 180;
    sDeg = (s / 60) * 360 + 180;

    // SETTING THE CLOCK'S HANDS ELEMENT
    hEl.style.transform = "rotate(" + hDeg + "deg)";
    mEl.style.transform = "rotate(" + mDeg + "deg)";
    sEl.style.transform = "rotate(" + sDeg + "deg)";
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
              <S.HourHand ref={this.hEl} />
              <S.MinuteHand ref={this.mEl} />
              <S.SecondHand ref={this.sEl} />
            </div>
            <div>
              <S.H3 ref={this.h3}>3</S.H3>
              <S.H6 ref={this.h6}>6</S.H6>
              <S.H9 ref={this.h9}>9</S.H9>
              <S.H12 ref={this.h12}>12</S.H12>
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
