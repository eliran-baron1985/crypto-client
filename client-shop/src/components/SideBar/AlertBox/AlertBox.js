import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as s from "../../../store/selectors";
import AlertItem from "./AlertItem";
import alertSound from "../../../utils/media/alert.mp3";
import filter_duplicated_item from "../../../utils/helpers/filter_duplicated_item";
import { useAlert } from "react-alert";

const AlertBox = props => {
  const [list, setList] = useState(null);
  const [showList, setShowList] = useState(false);
  const alert = useAlert();


  useEffect(() => {
    const { filterGroup, isEmpty, tableEvents } = props;
    if (tableEvents) {
      if (tableEvents[filterGroup]) {

        const filteredList = tableEvents[filterGroup].slice();
        const newList = filter_duplicated_item(filteredList);

        // if new data is available
        if (newList.length) {

          // if list is already exist
          if (list && list.length > 0) {

            // if new list is bigger than the old list
            const diff = isDiff(newList, list);

            if (diff.length > 0) {
              diff.map(pos => {
                const alertText = `${pos.symbol}    |    ${pos.lastName}    |    ${pos.openTime}`
                alert.success(alertText);

                return true;
              });

              // alert & update
              // isUpdated(filterGroup, type, true);
              setList(newList.sort(sortByTime).reverse());
              alertAudio();

              // if there isn't a change - don't update 
            } else {
              // isUpdated(filterGroup, type, false);
            }
          } else {
            // initial old list 
            setList(newList.sort(sortByTime).reverse());
            isEmpty(false);
          }
        }
      }
    }
    // eslint-disable-next-line
  }, [props.tableEvents]);

  useEffect(() => {
    setShowList(props.isClicked);
  }, [props.isClicked]);

  const alertAudio = async () => {
    const audio = new Audio(alertSound)
    audio.play()
  };

  const convertToValidDate = date => {
    const partA = `${date.slice(0, 2)}`;
    const partB = `${date.slice(3, 5)}`;

    const newDate = date.replace(partB, partA);
    const newDate2 = newDate.replace(partA, partB);

    return newDate2;
  };

  const sortByTime = (a, b) => {
    const dateA = convertToValidDate(`${a.date} ${a.time}`);
    const dateB = convertToValidDate(`${b.date} ${b.time}`);

    return new Date(dateA) - new Date(dateB);
  };

  const isDiff = (array1, array2) => {
    return array1.filter(element1 => {
      return (
        array2.filter(element2 => {
          return JSON.stringify(element2) === JSON.stringify(element1);
        }).length === 0
      );
    });
  };

  return (
    <List show={showList && showList}>
      {list &&
        list.map((el, i) => <AlertItem key={i} data={el} index={i + 1} />)}
    </List>
  );
};

const mapStateToProps = state => {
  return {
    tableEvents: s.selectorTableEvents(state)
  };
};

export default connect(mapStateToProps)(AlertBox);

const List = styled.div`
  width: 100%;
  max-height: 350px;
  overflow-y: scroll;
  direction: ltr;
  display: ${props => (props.show ? "block" : "none")};

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #f5f5f5;
  }
`;

