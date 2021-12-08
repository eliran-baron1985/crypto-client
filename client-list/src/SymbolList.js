import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyle from "./styles/global/global.styles";
import config from "./config";

const SymbolList = () => {
  const [list, setList] = useState(config.symbols);
  const [errorMsg, setErrorMsg] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const newList = list.filter(s =>
      s.toLowerCase().includes(input.toLowerCase())
    );

    if (newList.length) return setList(newList.sort((a, b) => a.localeCompare(b)))

    if (!input.length) return resetList();

    setErrorMsg("No symbols found...");
    setList([]);

    // eslint-disable-next-line
  }, [input]);

  const resetList = () => {
    setList(config.symbols);
    setErrorMsg("");
    setInput("");
  };

  return (
    <Container>
      <GlobalStyle />
      <SearchBar>
        <Input
          onChange={e => setInput(e.target.value)}
          placeholder="Type Here..."
          value={input}
        />
        <ResetList onClick={() => resetList()}>RESET LIST</ResetList>
      </SearchBar>
      <h1 style={{ color: "red", marginTop: "50px", fontSize: "2rem" }}>
        {errorMsg}
      </h1>
      <List>
        {list.map((s, i) => (
          <Symbol target="_blank" href={`${config.url_graph}${s}`} key={i}>
            {s}
          </Symbol>
        ))}
      </List>
    </Container>
  );
};

export default SymbolList;

const Container = styled.div`
  display: flex;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 10rem;
`;

const List = styled.div`
  width: 100%;
  max-height: 80%;
  overflow-y: scroll;
  direction: ltr;
  display: "block";

  &::-webkit-scrollbar {
    width: 15px;
    height: 8px;
    background-color: #f5f5f5;
  }
`;

const SearchBar = styled.div`
  width: 95%;
  height: 50px;
  display: flex;
`;

const ResetList = styled.button`
  width: 10%;
  font-size: 2rem;
  padding: 1rem;
  height: 50px;
  cursor: pointer;
  border: 1px solid black;
  &:hover {
    background-color: #7693fc;
    color: white;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 2rem;
`;

const Symbol = styled.a`
  width: 100%;
  height: 3rem;
  padding: 1rem;
  margin-top: 0.5rem;
  background-color: white;
  font-weight: normal;
  font-size: 2rem;
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
