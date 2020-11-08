import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

  body {
    font-family: 'Roboto', sans-serif;
  }

  .react-autosuggest__input {
  padding: 10px 20px;
  width: 100%;
  height: 40px;
  background-color: #eee;
  font-family: inherit;
  outline: transparent;
  border: none;
  border-radius: 5px;
  z-index: 999;

  @media (min-width: 1200px) {
    font-size: 15px;
  }
  }

  .react-autosuggest__suggestions-list {
    margin-top: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,.3);
  }

  .react-autosuggest__suggestion {
    list-style: none;
  }
  
`;

export default GlobalStyle;
