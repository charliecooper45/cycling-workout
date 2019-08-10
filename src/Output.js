import React, { useContext } from "react";
import styled from "styled-components";
import { IntervalContext, OutputContext } from "./App";

const OutputHeader = styled.h2`
  font-size: 0.8em;

  @media (min-width: 600px) {
    font-size: 2em;
  }
`;

const Output = () => {
  const { intervals } = useContext(IntervalContext);
  const { output, setOutput } = useContext(OutputContext);

  const validIntervals = intervals.filter(interval => interval.valid);
  let newOutput = null;
  if (validIntervals.length > 0) {
    newOutput = validIntervals.reduce((accumulator, interval) => {
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
        timeOutput = timeOutput + `${hours}h `;
      }
      if (minutes > 0) {
        timeOutput = timeOutput + `${minutes}m `;
      }
      if (seconds > 0) {
        timeOutput = timeOutput + `${seconds}s `;
      }

      const intervalString =
        repeats === 1
          ? `${timeOutput}@ ${wattsOutput}w`
          : `${repeats} x ${timeOutput}@ ${wattsOutput}w`;

      return accumulator === ""
        ? intervalString
        : `${accumulator}, ${intervalString}`;
    }, "");
  }
  setOutput(newOutput);

  return (
    <OutputHeader>{output || "Add an interval to get started!"}</OutputHeader>
  );
};

export default Output;
