import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;
export const Digital = styled.div`
  position: absolute;
  top: 188px;
  left: 49px;
  font-size: 2rem;
  font-family: Arial, Helvetica, sans-serif;
`;
export const Analog = styled.div`
  background: #ececec;
  width: 176px;
  height: 176px;
  margin: 8% auto 0;
  border-radius: 50%;
  border: 2px solid #333;
  position: absolute;
`;
export const Dot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ccc;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  z-index: 10;
  box-shadow: 0 2px 4px -1px black;
`;
export const HourHand = styled.div`
  position: absolute;
  z-index: 5;
  width: 4px;
  height: 40px;
  background: #333;
  top: 50%;
  left: 50%;
  transform-origin: top;
  transform: rotate(180deg);
  margin-left: -2px;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
`;
export const MinuteHand = styled.div`
  position: absolute;
  z-index: 6;
  width: 4px;
  height: 59px;
  background: tomato;
  top: 50%;
  left: 50%;
  transform-origin: top;
  transform: rotate(180deg);
  margin-left: -2px;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
`;
export const SecondHand = styled.div`
  position: absolute;
  z-index: 7;
  width: 2px;
  height: 75px;
  background: gold;
  top: 50%;
  left: 50%;
  transform-origin: top;
  transform: rotate(180deg);
  margin-left: -1px;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
`;
export const Span = styled.span`
  display: inline-block;
  position: absolute;
  color: #333;
  font-size: 20px;
  font-family: "Poiret One";
  font-weight: 700;
  z-index: 4;
`;

// day clock
export const H12 = styled(Span)`
  top: 20px;
  left: 50%;
  margin-left: -9px;
`;
export const H3 = styled(Span)`
  top: 75px;
  right: 20px;
`;
export const H6 = styled(Span)`
  bottom: 16px;
  left: 50%;
  margin-left: -5px;
`;
export const H9 = styled(Span)`
  left: 21px;
  top: 75px;
`;

// 5 min clock
export const H01 = styled(Span)`
  top: 53px;
  left: 86%;
`;
export const H02 = styled(Span)`
  top: 126px;
  right: 43px;
`;
export const H03 = styled(Span)`
  bottom: 23px;
  left: 28%;
`;
export const H04 = styled(Span)`
  left: 15px;
  top: 53px;
`;
export const H05 = styled(Span)`
  top: 20px;
  left: 47%;
`;

// 15 min clock
export const H60 = styled(Span)`
  top: 18px;
  left: 45%;
`;
export const H15 = styled(Span)`
  top: 74px;
  right: 22px;
`;
export const H30 = styled(Span)`
  bottom: 17px;
  left: 44%;
`;
export const H45 = styled(Span)`
  left: 23px;
  top: 74px;
`;

export const DialLines = styled.div`
  position: absolute;
  z-index: 2;
  width: 2px;
  height: 10px;
  background: #666;
  left: 50%;
  margin-left: -1px;
  transform-origin: 50% 86px;

  &:nth-of-type(5n) {
    width: 3px;
    z-index: 2;
    position: absolute;
    height: 18px;
    background: #666;
    left: 50%;
    margin-left: -1px;
    transform-origin: 50% 86px;
  }
`;
export const DialLines_short = styled.div`
  position: absolute;
  z-index: 2;
  width: 2px;
  height: 10px;
  background: #666;
  left: 50%;
  margin-left: -1px;
  transform-origin: 50% 86px;
`;
export const Info = styled.div`
  position: absolute;
  width: 80px;
  height: 20px;
  border-radius: 7px;
  background: #ccc;
  text-align: center;
  line-height: 20px;
  color: #000;
  font-size: 11px;
  top: 200px;
  left: 50%;
  margin-left: -60px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  z-index: 3;
  letter-spacing: 3px;
  margin-left: -60px;
  left: 62%;
`;
export const DateBox = styled(Info)`
  top: 45px;
`;
export const DayBox = styled(Info)`
  top: 105px;
`;
export const TypeBox = styled(Info)`
  top: 105px;
`;
