import { observer } from "mobx-react-lite";
import React from "react";
import { store } from "../input.model";

export const ModelTestingPage: React.FC = observer(() => {
  const {
    data,
    inputValue,
    isInputFocused,
    activeListIndex,
    activeManagerId,
    keyEventHandler,
  } = store;

  React.useEffect(() => {
    window.addEventListener("keydown", ({ key }) => keyEventHandler(key));
  }, []);

  return (
    <>
      <div data-testid="data">{data}</div>
      <div data-testid="inputValue">{inputValue}</div>
      {!inputValue && <div data-testid="isInputRendering"></div>}
      <div data-testid="activeListIndex">{activeListIndex}</div>
      <div data-testid="activeManagerId">{activeManagerId}</div>
    </>
  );
});
