import React, { useContext } from "react";
import styled from "styled-components";
import { IntervalContext } from "./App";

const OutputHeader = styled.h2`
  font-size: 0.8em;

  @media (min-width: 600px) {
    font-size: 1.4em;
  }
`;

const Output = () => {
  const { intervals } = useContext(IntervalContext);

  let output = "Add an interval to get started!";

  const validIntervals = intervals.filter(interval => interval.valid);
  if (validIntervals.length > 0) {
    output = validIntervals.reduce((accumulator, interval) => {
      const {
        hours,
        minutes,
        seconds,
        wattsMinimum,
        wattsMaximum,
        repeats
      } = interval;

      const wattsOutput =
        wattsMinimum === wattsMaximum
          ? wattsMinimum
          : `${wattsMinimum}-${wattsMaximum}`;

      let timeOutput = ``;
      if (hours > 0) {
        timeOutput = timeOutput + `${hours} h `;
      }
      if (minutes > 0) {
        timeOutput = timeOutput + `${minutes} m `;
      }
      if (seconds > 0) {
        timeOutput = timeOutput + `${seconds} s `;
      }

      const intervalString = `${repeats} x ${timeOutput}@ ${wattsOutput} watts`;
      return accumulator === ""
        ? intervalString
        : `${accumulator}, ${intervalString}`;
    }, "");
  }

  return <OutputHeader>{output}</OutputHeader>;
};

export default Output;
