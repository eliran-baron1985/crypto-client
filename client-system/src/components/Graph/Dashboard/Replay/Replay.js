import React from "react";
import styled from "styled-components";
import { IoIosPlay, IoMdAnalytics } from "react-icons/io";

const Replay = ({ dates, isLoading, onSelectDate, sendDate }) => {
  return (
    <Box>
      <Button onClick={() => sendDate("lastCandles")} disabled={isLoading}>
        <IoMdAnalytics style={{fontSize: "25px"}} />
      </Button>
      <Select
        onChange={e => onSelectDate(e.target.value, "start")}
        onFocus={e => onSelectDate(e.target.value, "start")}
      >
        {isLoading ? (
          <Option key="-1">Loading...</Option>
        ) : (
          dates.map((date, i) => <Option key={i}>{date}</Option>)
        )}
      </Select>
      <Select
        onChange={e => onSelectDate(e.target.value, "end")}
        onFocus={e => onSelectDate(e.target.value, "end")}
      >
        {isLoading ? (
          <Option key="-1">Loading...</Option>
        ) : (
          dates.map((date, i) => <Option key={i}>{date}</Option>)
        )}
      </Select>
      <Button onClick={() => sendDate("dateToDate")} disabled={isLoading}>
        <IoIosPlay style={{fontSize: "25px", }} />
      </Button>
    </Box>
  );
};

export default Replay;

const Box = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
const Button = styled.button`
padding: 0.5px;
`;

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
