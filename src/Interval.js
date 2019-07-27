import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IntervalContext } from "./App";

const IntervalDiv = styled.div`
  background-color: rgba(245, 247, 250, 1);
  box-shadow: 0 2px 5px 0px
    ${props => (props.valid ? "rgba(0, 0, 0, 0.2)" : "rgba(250, 40, 40, 0.2)")};
  border-radius: 10px;
  display: grid;
  grid-template-columns: auto 4fr auto auto;
  grid-template-rows: auto 30px;
  grid-column-gap: 5px;
  padding: 10px 2px 10px 2px;

  input {
    min-width: 30px;
    font-size: 0.6em;
  }

  @media (min-width: 600px) {
    grid-column-gap: 10px;
    padding: 10px 10px 15px 10px;
  }
`;

const LabelSpan = styled.span`
  display: grid;
  font-size: 0.5em;
  justify-items: start;
  align-items: end;

  &#repeats-label {
    grid-column: 3 / -1;
  }

  @media (min-width: 600px) {
    font-size: 0.6em;
  }
`;

const TimeSpan = styled.span`
  display: grid;
  grid-gap: 2px;
  grid-template-columns: repeat(5, auto);

  input {
    max-width: 40px;
  }

  span {
    margin: auto;
  }
`;

const WattsSpan = styled.span`
  display: grid;
  grid-gap: 2px;
  grid-template-columns: 1fr auto 1fr;

  span {
    margin: auto;
  }
`;

const RepeatsSpan = styled.span`
  display: grid;

  input {
    max-width: 20px;
    min-width: 30px;
  }
`;

const OptionsSpan = styled.span`
  display: grid;
`;

// TODO: on re-render only re-render if this interval has changed
const Interval = ({ id }) => {
  const { intervals, dispatch } = useContext(IntervalContext);

  const handleRemoveInterval = () => dispatch({ type: "REMOVE_INTERVAL", id });

  const validateInterval = updatedInterval => {
    const {
      hours,
      minutes,
      seconds,
      wattsMinimum,
      wattsMaximum,
      repeats
    } = updatedInterval;

    // user must specify a time period
    if (hours <= 0 && minutes <= 0 && seconds <= 0) return false;

    // min must be above or equal to max
    if (wattsMinimum > wattsMaximum) return false;

    // at least one repeat
    if (repeats <= 0) return false;

    return true;
  };

  const handleUpdateInterval = event => {
    const {
      target: { id, value }
    } = event;

    // restrict watts to less than 5 digits, time fields to less than 3
    const maxLength = ["wattsMinimum", "wattsMaximum"].includes(id) ? 4 : 2;
    if (value.length > maxLength) return;

    // if minutes or seconds then do not allow user to enter more than 59
    const numberValue = Number(value);
    if (["minutes", "seconds"].includes(id) && numberValue > 59) return;

    const updatedInterval = {
      ...interval,
      [id]: numberValue
    };

    // if user updates minimum watts then set maximum watts if it's below
    if (id === "wattsMinimum") {
      const { wattsMaximum } = interval;
      if (numberValue > wattsMaximum) {
        updatedInterval.wattsMaximum = numberValue;
      }
    }

    // validate the interval
    const valid = validateInterval(updatedInterval);

    dispatch({
      type: "UPDATE_INTERVAL",
      interval: { ...updatedInterval, valid }
    });
  };

  const interval = intervals.find(interval => interval.id === id);
  const {
    hours,
    minutes,
    seconds,
    wattsMinimum,
    wattsMaximum,
    repeats,
    valid
  } = interval;

  return (
    <IntervalDiv valid={valid}>
      <LabelSpan>Time (hours, mins, secs)</LabelSpan>
      <LabelSpan>Watts (min, max)</LabelSpan>
      <LabelSpan id="repeats-label">Repeats</LabelSpan>
      <TimeSpan>
        <input
          id="hours"
          type="number"
          min="0"
          maxLength="2"
          value={hours}
          onChange={handleUpdateInterval}
        />
        <span>:</span>
        <input
          id="minutes"
          type="number"
          min="0"
          maxLength="2"
          value={minutes}
          onChange={handleUpdateInterval}
        />
        <span>:</span>
        <input
          id="seconds"
          type="number"
          min="0"
          maxLength="2"
          value={seconds}
          onChange={handleUpdateInterval}
        />
      </TimeSpan>
      <WattsSpan>
        <input
          id="wattsMinimum"
          type="number"
          min="0"
          maxLength="4"
          value={wattsMinimum}
          onChange={handleUpdateInterval}
        />
        <span>&rarr;</span>
        <input
          id="wattsMaximum"
          type="number"
          min="1"
          maxLength="4"
          value={wattsMaximum}
          onChange={handleUpdateInterval}
        />
      </WattsSpan>
      <RepeatsSpan>
        <input
          id="repeats"
          type="number"
          min="1"
          maxLength="2"
          value={repeats}
          onChange={handleUpdateInterval}
        />
      </RepeatsSpan>
      <OptionsSpan>
        <button onClick={handleRemoveInterval}>DELETE</button>
      </OptionsSpan>
    </IntervalDiv>
  );
};

Interval.propTypes = {
  id: PropTypes.string.isRequired
};

export default Interval;
