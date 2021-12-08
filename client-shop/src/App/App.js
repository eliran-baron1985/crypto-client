import React, { Component } from "react";
import styled from "styled-components";
import GlobalStyle from "../styles/global/global.styles";
import * as api from "../utils/services/api/api";
import { connect } from "react-redux";
import * as actions from "./App.actions";

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import SideBar from "../components/SideBar/SideBar";
import Shop from "../components/Shop/Shop";

import AOS from "aos";
import "aos/dist/aos.css";

class App extends Component {
  componentDidMount() {
    // ANIMATION LIBRARY
    AOS.init();
    // SUBSCRIBE TO
    this.listenToTrades()
    // GET HiSTORY
    api.historyPositionsEvents();
  }

  listenToTrades = () => {
    // api.subscribeShop()
    api.getDataToGlobalStore(this.updateGlobalState);
  }

  updateGlobalState = (err, data) => {
    switch (data.id) {
      case 0:
        return this.props.do_getHistoryPositions(data);
      case 1:
        return this.props.do_getTrades(data);

      default:
        break;
    }
  };

  options = () => ({
    timeout: 100000,
    position: positions.MIDDLE
  });


  render() {
    return (
      <Wrapper>
        <GlobalStyle />
        <Provider template={AlertTemplate} {...this.options()}>
          <SideBar />
        </Provider>
        <Shop />
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    do_getTrades: data => dispatch(actions.getTrades(data)),
    do_getHistoryPositions: data => dispatch(actions.getHistoryPositions(data))
  };
};

export default connect(null, mapDispatchToProps)(App);

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0.5rem 1rem;
  overflow: hidden;
  display: flex;
`;
