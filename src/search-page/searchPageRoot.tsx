import { observer } from "mobx-react";
import React from "react";
import "../App.css";
import { useStore } from "../root.model";
import { Input } from "./partials/input";
import { SearchList } from "./partials/list";

interface Props {}

export const SearchPage: React.FC<Props> = observer(() => {
  const {
    searchPage: {
      activeManagerId,
      isInputFocused,
      setIsInputFocused,
      managersFilteredByInput,
      inputValue,
      activeListIndex,
      managersListLength,
      getMangers,
      setInputValue,
      setActiveListItem,
      keyEventHandler,
    },
  } = useStore();

  React.useEffect(() => {
    getMangers();
    window.addEventListener("keydown", ({ key }) => keyEventHandler(key));
  }, []);

  React.useEffect(() => {
    const managerToSet = managersFilteredByInput.find(
      ({ id }) => id === activeManagerId
    )?.name;
    if (!managerToSet) return;
    setInputValue(managerToSet);
  }, [activeManagerId]);

  React.useEffect(() => {
    setActiveListItem(undefined);
  }, [managersListLength]);

  React.useEffect(() => {
    !isInputFocused && setActiveListItem(undefined);
  }, [isInputFocused]);

  return (
    <>
      <Input
        value={inputValue}
        isInputFocused={isInputFocused}
        setInputValue={setInputValue}
        setIsInputFocused={setIsInputFocused}
      />
      {isInputFocused && (
        <SearchList
          list={managersFilteredByInput}
          activeListIndex={activeListIndex}
        />
      )}
    </>
  );
});
