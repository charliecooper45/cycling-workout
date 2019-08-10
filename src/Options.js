import React, { useContext } from "react";
import { IntervalContext, OutputContext } from "./App";
import styled from "styled-components";
import { useClipboard } from "use-clipboard-copy";

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
  min-height: 40px;
  justify-self: end;

  @media (min-width: 600px) {
    grid-column: 2;
  }
`;

const CopyOutputButton = styled.button`
  min-width: 140px;
  justify-self: start;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Options = () => {
  const { dispatch } = useContext(IntervalContext);
  const { output } = useContext(OutputContext);
  const clipboard = useClipboard({
    copiedTimeout: 800
  });

  const handleAddInterval = () =>
    dispatch({
      type: "ADD_INTERVAL"
    });

  const handleCopyOutput = () => clipboard.copy(output);

  return (
    <OptionsDiv>
      <AddIntervalButton onClick={handleAddInterval}>
        ADD INTERVAL
      </AddIntervalButton>
      <CopyOutputButton disabled={output === null} onClick={handleCopyOutput}>
        {clipboard.copied ? "COPIED!" : "COPY TO CLIPBOARD"}
      </CopyOutputButton>
    </OptionsDiv>
  );
};

export default Options;
