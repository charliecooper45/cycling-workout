import React, { useContext } from "react";
import Interval from "./Interval";
import styled from "styled-components";
import { IntervalContext } from "./App";

const IntervalsDiv = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  grid-gap: 10px;
`;

const Intervals = () => {
  const { intervals } = useContext(IntervalContext);
  return (
    <IntervalsDiv>
      {intervals.map(({ id }) => (
        <Interval key={id} id={id} />
      ))}
    </IntervalsDiv>
  );
};

export default Intervals;
