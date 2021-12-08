import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import changeClockType from "./Tabs.action";

const Tabs = props => {
  const oneMin = `/graph/01/${props.symbol}`;
  const fiveMin = `/graph/05/${props.symbol}`;
  const fifteenMin = `/graph/15/${props.symbol}`;
  const oneHour = `/graph/1h/${props.symbol}`;
  const oneDay = `/graph/1d/${props.symbol}`;
  const home = "/";
  const shop = "/shop";
  const symbolList = "/symbolList";

  return (
    <Box isBig>
      <Link to={symbolList} target="_blank">
        <Button isBig>SYMBOLS</Button>
      </Link>
      <Link to={oneMin} target="_blank">
        <Button
          isBig
          isActive={props.type === "01"}
          onClick={() => props.doChangeClockType("is1Min")}
        >
          1MIN
        </Button>
      </Link>
      <Link to={fiveMin} target="_blank">
        <Button
          isBig
          isActive={props.type === "05"}
          onClick={() => props.doChangeClockType("is5Min")}
        >
          5MIN
        </Button>
      </Link>
      <Link to={fifteenMin} target="_blank">
        <Button
          isBig
          isActive={props.type === "15"}
          onClick={() => props.doChangeClockType("is15Min")}
        >
          15MIN
        </Button>
      </Link>
      <Link to={oneHour} target="_blank">
        <Button
          isBig
          isActive={props.type === "1h"}
          onClick={() => props.doChangeClockType("is1H")}
        >
          H1
        </Button>
      </Link>
      <Link to={oneDay} target="_blank">
        <Button
          isBig
          isActive={props.type === "1d"}
          onClick={() => props.doChangeClockType("isADay")}
        >
          DAY
        </Button>
      </Link>

      <Link to={props.isBig ? fifteenMin : home}>
        <Button onClick={() => props.doChangeClockType("isADay")}>
          <IoMdSearch style={{ fontSize: "18px" }} />
        </Button>
      </Link>

      {!props.isBig && (
        <Link to={shop} target="_blank">
          <Button>SHOP</Button>
        </Link>
      )}
    </Box>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    doChangeClockType: type => dispatch(changeClockType(type))
  };
};

export default connect(null, mapDispatchToProps)(Tabs);

const Box = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: ${props => (props.isBig ? "flex-start" : "center")};
`;

const Button = styled.button`
  background-color: ${props => (props.isActive ? "yellow" : "transparent")};
`;
