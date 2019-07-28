import React, { useReducer, useState, createContext } from "react";
import uuid from "uuid/v4";
import { createGlobalStyle } from "styled-components";
import Main from "./Main";

const initialIntervals = [];

const intervalReducer = (state, action) => {
  switch (action.type) {
    case "ADD_INTERVAL":
      const newInterval = {
        id: uuid(),
        hours: 0,
        minutes: 0,
        seconds: 0,
        wattsMinimum: 1,
        wattsMaximum: 1,
        repeats: 1,
        valid: false
      };
      return [...state, newInterval];
    case "REMOVE_INTERVAL":
      return state.filter(interval => interval.id !== action.id);
    case "UPDATE_INTERVAL":
      return state.map(interval => {
        return interval.id === action.interval.id ? action.interval : interval;
      });
    default:
      throw new Error();
  }
};

export const IntervalContext = createContext(null);
export const OutputContext = createContext(null);

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Patua+One&display=swap');
  
  html {
    box-sizing: border-box;
    font-family: 'Patua One', cursive;
  }
  
  body {
    margin: 0;
    background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    color: #231d6e;
    user-select: none;
  }

  #root {
    display: grid;
    grid-template-columns: 1fr;
  }
  
  button, input {
    &:focus {
      outline: 0;
    }
  }
  
  button {
    border-radius: 10px;
    box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.2);
    font-size: 0.5em;
    
    &:hover {
      cursor: pointer;
      background: #F8F8F8;
    }
  }
  
  input {
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  @media (min-width: 600px) {
    #root {
      grid-template-columns: 1fr 500px 1fr;
    }
    
    button {
      font-size: .7em;
    }
  }
  
  @media (min-width: 800px) {
    #root {
      grid-template-columns: 1fr 700px 1fr;
    }
  }
`;

const App = () => {
  const [intervals, dispatch] = useReducer(intervalReducer, initialIntervals);
  const [output, setOutput] = useState(null);

  return (
    <IntervalContext.Provider value={{ intervals, dispatch }}>
      <OutputContext.Provider value={{ output, setOutput }}>
        <GlobalStyle />
        <Main />
      </OutputContext.Provider>
    </IntervalContext.Provider>
  );
};

export default App;
