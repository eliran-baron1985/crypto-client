import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as s from "../../store/selectors";
import { PacmanLoader } from "react-spinners";

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      list: null,
      cachingOpenList: {
        all: []
      },
      openEventType: "all"
    }
  }

  componentDidMount() {
    if (this.props.openList & this.props.closeList) {
      this.updateCaching()
    }
  }

  updateCaching = diff => {
    const cachingOpenList = { all: [], ...this.props.openList };

    for (let key in this.props.openList) {
      cachingOpenList.all.push(...this.props.openList[key])
    }

    this.setState({ cachingOpenList }, () => this.filterPositions(diff))
  }

  componentDidUpdate(lastProps, lastState) {
    const oldListOpen = lastProps.openList;
    const newerListOpen = this.props.openList;

    const oldListClose = lastProps.closeList;
    const newerListClose = this.props.closeList;

    const openEventType = this.state.openEventType;

    if (newerListOpen && newerListClose) {
      if (lastState.openEventType !== openEventType) {
        return this.filterPositions();
      }
      if (oldListOpen && newerListOpen) {
        const newerListOpenArray = [];
        const oldListOpenArray = [];

        for (let key in newerListOpen) {
          newerListOpenArray.push(...newerListOpen[key])
        }
        for (let key in oldListOpen) {
          oldListOpenArray.push(...oldListOpen[key])
        }
        const diff_open = this.isDiff(newerListOpenArray, oldListOpenArray);
        const isDiff_open = diff_open.length;


        const diff_close = this.isDiff(newerListClose, oldListClose);
        const isDiff_close = diff_close.length;

        console.log("diff_close: ", diff_close)
        console.log("isDiff_close: ", isDiff_close)

        if (isDiff_open || isDiff_close) {
          return this.updateCaching();
        }
      } else {
        return this.updateCaching();
      }
    }
  }



  filterPositions = () => {
    const { closeList } = this.props;
    const { cachingOpenList, openEventType } = this.state;
    const openListEvent = cachingOpenList[openEventType];
    const datesList = [];
    const newList = openListEvent
      .slice()
      .sort(this.sortByTime)
      .map((openPos, i) => {

        const closePos = this.findClosePosition(openPos, closeList);

        datesList.push(openPos.date);

        return {
          ...openPos,
          symbol: openPos.symbol,
          serialNumber: openPos.id || "",
          startDate: `${openPos.date} ${openPos.openTime}`,
          operation: openPos.name.length === 8 ? "buy" : "sell",
          eventName: openPos.lastName,
          initPrice: openPos.close !== undefined ? openPos.close : "",
          endDate:
            closePos !== undefined ? `${closePos.date} ${closePos.time}` : "",
          endPrice: closePos !== undefined ? closePos.close : "",
          succeeded: this.checkSucced(openPos, closePos),
          pipses: this.checkPipses(openPos, closePos),
        };
      });



    const lists = [],
      size = 10;

    while (newList.length > 0) lists.push(newList.splice(0, size).reverse());

    const newLists = lists.map(group => {
      const succeededGroupPrecentage = group
        .map(p => {
          const closeP = this.findClosePosition(p, closeList);

          if (closeP) {
            if (p.name.length === 8) {
              return Number(p.close) < Number(closeP.close);
            }

            return Number(p.close) > Number(closeP.close);
          }
          return null;
        })
        .filter(p => p !== null);

      const succeededPerctage = (
        succeededGroupPrecentage.filter(p => p).length /
        succeededGroupPrecentage.length
      ).toFixed(2);

      const firstItem = group[0];
      const newGroup = group.slice(1, group.length);

      const percentages =
        succeededPerctage < 1 ? `${succeededPerctage.slice(-2)}%` : "100%";

      return [{ ...firstItem, succeededPerctage: percentages }, ...newGroup];
    });


    this.setState({
      list: newLists.reverse(),
      isLoading: false
    })
  };

  findClosePosition = (openPos, closeList) => {
    return closeList.find(p => {
      const typeOpen = openPos.name.length === 8 ? "buy" : "sell";
      const typeClose = p.name.length === 9 ? "buy" : "sell";

      if (
        p.openTime !== undefined &&
        p.openDate !== undefined &&
        p.openTime === openPos.time &&
        p.openDate === openPos.date &&
        p.symbol === openPos.symbol &&
        typeOpen === typeClose
      )
        return p;

      return false;
    });
  };

  checkSucced = (start, end) => {
    if (end) {
      const posType = start.name.length === 8 ? "buy" : "sell";

      switch (posType) {
        case "buy":
          return Number(start.close) < Number(end.close)
            ? "true"
            : "false"

        case "sell":
          return Number(start.close) > Number(end.close)
            ? "true"
            : "false"
        default:
          break;
      }

    }

    return ""
  }


  checkPipses = (start, end) => {
    if (end) {
      const posType = start.name.length === 8 ? "buy" : "sell";

      switch (posType) {
        case "buy":
          return (Number(end.close) - Number(start.close)).toFixed(5)


        case "sell":
          return (Number(start.close) - Number(end.close)).toFixed(5)

        default:
          break;
      }

    }

    return ""
  }

  convertToValidDate = date => {
    const partA = `${date.slice(0, 2)}`;
    const partB = `${date.slice(3, 5)}`;

    const newDate = date.replace(partB, partA);
    const newDate2 = newDate.replace(partA, partB);

    return newDate2;
  };

  sortByTime = (a, b) => {
    const dateA = this.convertToValidDate(`${a.date} ${a.openTime}`);
    const dateB = this.convertToValidDate(`${b.date} ${b.openTime}`);

    return new Date(dateA) - new Date(dateB);
  };

  isDiff = (array1, array2) => {
    const diff = array1.filter(element1 => {
      return (
        array2.filter(element2 => {
          return JSON.stringify(element2) === JSON.stringify(element1);
        }).length === 0
      );
    })


    return diff;
  };

  symbolList = () => {
    return [
      "all",
      "1.1",
      "2.1",
      "2.2"
    ]
  };

  handleFilterList = item => {
    if (this.props.openList[item]) {
      this.setState({ openEventType: item })
    }

    if (item === "all") {
      this.setState({ openEventType: item })
    }
  };

  render() {
    const { isLoading, list } = this.state;

    return (
      <Conatiner>
        <Main>
          {isLoading && (
            <LoadingBox>
              <PacmanLoader color={"orange"} />
            </LoadingBox>
          )}

          <Box>
            <SymbolList>
              {this.symbolList().map((item, index) => (
                <Button key={index} big={() => true} onClick={() => this.handleFilterList(item)}>{item}</Button>
              ))}
            </SymbolList>

            <Head>
              <Info>#</Info>
              <Info>Symbol</Info>
              <Info>Operation</Info>
              <Info>Start Date</Info>
              <Info>End Date</Info>
              <Info>Start Price</Info>
              <Info>End Price</Info>
              <Info>Succeeded</Info>
              <Info>Succeeded (%)</Info>
              <Info>Pipses</Info>
              <Button>
                <InfoButton
                  target="_blank"
                  href={`http://localhost:3000/symbolList`}
                >
                  SYMBOLS
          </InfoButton>
              </Button>
            </Head>
          </Box>

          {list &&
            list.map((group, index) => (
              <List key={index}>
                {group.map((el, i) => (
                  <Item key={i}>
                    <Info>{i + 1}</Info>
                    <Info>
                      {el.symbol}
                      <Button>
                        <InfoButton
                          target="_blank"
                          href={`http://localhost:3000/graph/1h/${el.symbol}`}
                        >
                          1H
                        </InfoButton>
                      </Button>


                      <Button >
                        <InfoButton
                          target="_blank"
                          href={`http://localhost:3000/graph/15/${el.symbol}`}
                        >
                          15
                        </InfoButton>
                      </Button>
                    </Info>
                    <Info>{el.operation} - {el.eventName}</Info>
                    <Info>{el.startDate}</Info>
                    <Info>{el.endDate}</Info>
                    <Info>{el.initPrice}</Info>
                    <Info>{el.endPrice}</Info>
                    <Info>{el.succeeded}</Info>
                    <Info>{el.succeededPerctage}</Info>
                    <Info>{el.pipses}</Info>
                  </Item>
                ))}
              </List>
            ))}
        </Main>
      </Conatiner >
    );
  }
};

const mapStateToProps = state => {
  return {
    openList: s.selectorShopPositionOpen(state),
    closeList: s.selectorShopPositionClose(state)
  };
};

export default connect(mapStateToProps)(Shop);

const Conatiner = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 77%;
  height: 100%;
  overflow-y: scroll;
  direction: ltr;
  display: block;

  
  &::-webkit-scrollbar {
    width: 15px;
    height: 8px;
    background-color: grey;
  }
`;

const Box = styled.div`
  height: 100px;
  position: fixed;
  left: 500px;
  top: 0;
  width: 72%;
  background-color: white;
`;

const SymbolList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const Head = styled.li`
  border-radius: 7px;
  height: 5rem;
  display: flex;
  align-items: center;
  background-color: #7693fc;
  color: white;
  // border: 3px solid red;
`;

const Main = styled.main`
  flex-basis: 92%;
  width: 100%;
  height: 100%;
  max-height: 100%;
 
`;

const List = styled.div`
  margin-top: 50px;
  width: 100%;
  border-bottom: 3px solid lightblue;

  &:nth-child(2) {
    margin-top: 110px;
  }
`;

const Item = styled.li`
  width: 98%;
  height: 5rem;
  display: flex;
  align-items: center;
  background-color: white;
  color: black;
  border: 1px solid lightgrey;
  margin-left: 1rem;
`;

const Info = styled.p`
  font-size: 1.6rem;
  border-radius: 7px;
  font-family: "Lato";

  flex-basis: 10%;
  text-align: center;

  &:nth-child(2) {
    flex-basis: 15%;
  }

  &:first-child {
    flex-basis: 3%;
  }

`;

const Button = styled.button`
  padding: ${props => props.big ? "2rem" : ".2rem"};
  margin: ${props => props.big ? ".5rem 1.5rem" : "0 1rem"};
`;

const InfoButton = styled.a`
  font-size: 1.6rem;
  font-family: "Lato";
  text-align: center;
  cursor: pointer;
`;

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;


