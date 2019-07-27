import React from "react";
import styled from "styled-components";
import Options from "./Options";
import Intervals from "./Intervals";
import Output from "./Output";

const MainDiv = styled.div`
  background-color: rgba(245, 247, 250, 0.5);
  box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.2);
  height: 100vh;
  text-align: center;
  overflow: auto;

  @media (min-width: 600px) {
    grid-column: 2;
    padding: 0 20px;
  }
`;

const SiteHeader = styled.h1`
  transform: skew(-10deg);
  font-size: 1.4em;

  @media (min-width: 600px) {
    font-size: 3em;
  }
`;

const Main = () => {
  return (
    <MainDiv>
      <SiteHeader>cycling-workout</SiteHeader>
      <Output />
      <Options />
      <Intervals />
    </MainDiv>
  );
};

export default Main;
