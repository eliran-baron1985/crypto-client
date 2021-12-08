import React from "react";
import styled from "styled-components";
import AlertBox from "./AlertBox/AlertBox";
import ReplayContainer from "../../../containers/Replay/ReplayContainer";
import Paint from "./Paint/Paint";
import Tabs from "../../../features/Tabs/Tabs";
import { IoIosNotifications } from "react-icons/io";

const Dashboard = ({ type, symbol }) => {
  return (
    <Container>
      <Controllers>
        <ReplayContainer type={type} />
        <Symbol>{symbol}</Symbol>
        <Paint />
        <Tabs symbol={symbol} type={type}/>
      </Controllers>

      <AlertSection>
        <IoIosNotifications style={{ fontSize: "35px" }} />
        <AlertBox type={type} symbol={symbol} />
      </AlertSection>

    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  padding: 0.5rem;
  width: 100%;
  height: 8%;
  min-height: 108px;
  border: 2px solid #7693fc;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Controllers = styled.div`
  display: flex;
  justify-content: space-between;
  flex-basis: 50%;
  max-width: 1296px;

  @media (min-width: 1470px) {
    max-width: none;
  }
`;

const AlertSection = styled(Controllers)`
  justify-content: flex-start;
  flex-basis: 50%;
`;

const Symbol = styled.div`
  font-size: 2rem;
  margin: 1rem;
  display: flex;
  align-items: center;
`;

