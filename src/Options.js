import React, { useContext } from "react";
import { IntervalContext } from "./App";
import styled from "styled-components";

const OptionsDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  min-height: 25px;
  margin-bottom: 10px;

  @media (min-width: 600px) {
    grid-template-columns: 1fr auto auto;
  }
`;

const AddIntervalButton = styled.button`
  min-width: 140px;
  justify-self: end;

  @media (min-width: 600px) {
    grid-column: 2;
  }
`;

const CopyOutputButton = styled.button`
  min-width: 140px;
  justify-self: start;
`;

const Options = () => {
  const { dispatch } = useContext(IntervalContext);

  const handleAddInterval = () =>
    dispatch({
      type: "ADD_INTERVAL"
    });

  // TODO: copy functionality
  return (
    <OptionsDiv>
      <AddIntervalButton onClick={handleAddInterval}>
        ADD INTERVAL
      </AddIntervalButton>
      <CopyOutputButton>COPY TO CLIPBOARD</CopyOutputButton>
    </OptionsDiv>
  );
};

export default Options;
