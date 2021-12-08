import React, { useState } from "react";
import styled from "styled-components";
import AlertBox from "./AlertBox/AlertBox";

import { IoIosNotifications } from "react-icons/io";

const SideBar = () => {
  const [listOperations, setlistOperations] = useState({
    buy: {
      2.1: { isClicked: false, isEmpty: true },
    },
    sell: {
      1.1: { isClicked: false, isEmpty: true },
    }
  });

  const updateListOperations = (type, item, action, value) => {
    const newListOperations = { ...listOperations };

    if (value) {
      newListOperations[type][item][action] = value;
    } else {
      newListOperations[type][item][action] = !newListOperations[type][item][
        action
      ];
    }

    setlistOperations(newListOperations);
  };

  const printGroups = type => {
    const groups = Object.keys(listOperations[type]);

    return groups.map((item, index) => {
      return (
        <div key={index}>
          <Header
            onClick={() => updateListOperations(type, item, "isClicked")}
          >
            <Info>{item}</Info>
            <Info style={{ fontSize: "1.5rem" }}>
              {listOperations[type][item].isEmpty ? "empty" : ""}
            </Info>
            <IoIosNotifications style={{ fontSize: "28px" }} />
          </Header>

          <AlertBox
            filterGroup={item}
            type={type}
            isEmpty={val => updateListOperations(type, item, "isEmpty", val)}
            isClicked={listOperations[type][item].isClicked}
          />
        </div>
      );
    });
  };

  return (
    <>
      <Container>
        <Title>BUY POSITIONS</Title>
        {listOperations && printGroups("buy")}
      </Container>
      <Container>
        <Title>SELL POSITIONS</Title>
        {listOperations && printGroups("sell")}
      </Container>
    </>
  );
};

export default SideBar;

const Container = styled.div`
  flex-basis: 13%;
  display: flex;
  border: 2px solid #7693fc;
  flex-direction: column;
  overflow-y: scroll;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  direction: rtl;

  &::-webkit-scrollbar {
    width: 15px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: orange;
  }
`;

const Title = styled.h1`
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  font-weight: bold;
  font-size: 1.6rem;
  color: white;
  text-align: center;
  border: 1px solid lightgrey;
  background-color: #7693fc;
  cursor: pointer;
`;

const Header = styled.div`
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  font-weight: bold;
  font-size: 1.6rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border: 1px solid lightgrey;
  background-color: #7693fc;
  cursor: pointer;
`;

const Info = styled.div`
  font-family: "Lato";
  flex-basis: 45%;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  font-weight: bold;

  &:nth-child(1) {
    color: white;
    flex-basis: 15%;
  }
`;
