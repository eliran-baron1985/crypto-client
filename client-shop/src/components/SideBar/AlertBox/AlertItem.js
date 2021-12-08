import React from "react";
import styled from "styled-components";

const AlertItem = ({ data }) => {
  const url = `http://localhost:3000/graph/15/${data.symbol}`;
  const type = data.name === "buy_open" ? "buy" : "sell";

  return (
    <Box type="button" target="_blank" href={url}>
      <Info>{data.symbol}</Info>
      <Info type={type === "buy" ? "green" : "red"}>{data.openTime}</Info>
      {data.closingPos && <Info>{data.closingPos}</Info>}
      <Info>{data.date.slice(0, 5)}</Info>
    </Box>
  );
};

export default AlertItem;

const Box = styled.a`
  width: 100%;
  height: 3rem;
  padding: 1rem;
  margin-top: 0.5rem;
  background-color: white;
  font-weight: normal;
  font-size: 1.2rem;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid lightgrey;
  cursor: pointer;

  &:hover {
    background-color: #7693fc;
    color: white;
  }
`;

const Info = styled.div`
  font-family: "Lato";
  flex-basis: 45%;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-right: 0.8rem;
  font-weight: bold;

  &:nth-child(1) {
    color: black;
    flex-basis: 15%;
  }
  &:nth-child(2) {
    color: ${props => props.type};
  }
`;
