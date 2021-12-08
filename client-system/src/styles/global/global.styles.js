import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  text-decoration: none;
  list-style: none;
}
html {
  font-size: 62.5%;
}

body {
  box-sizing: border-box;
  font-family: 'Varela Round', serif
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

div {
  border-radius: 6px;

  &::-webkit-scrollbar{
    width: 15px;
    height: 8px;
    background-color: #F5F5F5;
}


  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
}

a {
  color: black;
}

button {
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 6px;
  cursor: pointer;
  padding: .5rem;
  margin-right: .5rem;

  &:hover {
    background-color: lightgrey;
  }


  @media (min-width: 1470px) {
    margin-right: 1rem;
  }
}

`;

export default GlobalStyle;
