import React, { Fragment, useState } from "react";

const Interval = () => {
  const [interval, setInterval] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    wattsMinimum: 1,
    wattsMaximum: 1,
    repeats: 1
  });

  // TODO: make sure watts min <= watts max
  const handleChange = event => {
    const {
      target: { id, value }
    } = event;

    // restrict watts to less than 5 digits, time fields to less than 3
    const maxLength = ["wattsMinimum", "wattsMaximum"].includes(id) ? 4 : 2;
    if (value.length > maxLength) return;

    // if minutes or seconds then do not allow user to enter more than 59
    const numberValue = Number(value);
    if (["minutes", "seconds"].includes(id) && numberValue > 59) return;

    setInterval({
      ...interval,
      [id]: numberValue
    });
  };

  const calculateOutput = () => {
    const {
      hours,
      minutes,
      seconds,
      wattsMinimum,
      wattsMaximum,
      repeats
    } = interval;

    // check the user has entered a time
    if (hours + minutes + seconds === 0) return;

    const wattsOutput =
      wattsMinimum === wattsMaximum
        ? wattsMinimum
        : `${wattsMinimum}-${wattsMaximum}`;

    // TODO: improve syntax
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

    return `${repeats} x ${timeOutput}@ ${wattsOutput} watts`;
  };

  const {
    hours,
    minutes,
    seconds,
    wattsMinimum,
    wattsMaximum,
    repeats
  } = interval;

  return (
    <Fragment>
      <h1>{calculateOutput()}</h1>
      <form>
        <label>
          Hours:
          <input
            id="hours"
            type="number"
            min={0}
            value={hours}
            onChange={handleChange}
          />
        </label>
        <label>
          Minutes:
          <input
            id="minutes"
            type="number"
            min={0}
            value={minutes}
            onChange={handleChange}
          />
        </label>
        <label>
          Seconds:
          <input
            id="seconds"
            type="number"
            min={0}
            value={seconds}
            onChange={handleChange}
          />
        </label>
        <label>
          Watts-Min:
          <input
            id="wattsMinimum"
            type="number"
            min={1}
            value={wattsMinimum}
            onChange={handleChange}
          />
        </label>
        <label>
          Watts-Max:
          <input
            id="wattsMaximum"
            type="number"
            min={1}
            value={wattsMaximum}
            onChange={handleChange}
          />
        </label>
        <label>
          Repeats:
          <input
            id="repeats"
            type="number"
            min={1}
            value={repeats}
            onChange={handleChange}
          />
        </label>
      </form>
    </Fragment>
  );
};

export default Interval;
