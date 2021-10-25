import { observer } from "mobx-react";
import React from "react";
import "../App.css";
import { useStore } from "../root.model";
import { Input } from "./partials/input";
import { SearchList } from "./partials/list";

export const SearchPage: React.FC = observer(() => {
  const {
    searchPage: {
      activeManagerId,
      isInputFocused,
      managersArray,
      managersFilteredByInput,
      inputValue,
      activeListIndex,
      managersListLength,
      setActiveManagerId,
      setIsInputFocused,
      getMangers,
      setInputValue,
      setActiveListItem,
      keyEventHandler,
    },
  } = useStore();

  const searchListItem = React.useRef<any>(null);

  React.useEffect(() => {
    getMangers();
    window.addEventListener("keydown", ({ key }) => keyEventHandler(key));
  }, []);

  React.useEffect(() => {
    setActiveListItem(undefined);
  }, [managersListLength]);

  React.useEffect(() => {
    !isInputFocused && setActiveListItem(undefined);
  }, [isInputFocused]);

  React.useEffect(() => {
    const exactMatch = managersArray.find(({ name }) => name === inputValue);
    if (exactMatch) return;
    setActiveManagerId(false);
  }, [inputValue]);

  React.useEffect(() => {
    const managerToSet = managersFilteredByInput.find(
      ({ id }) => id === activeManagerId
    )?.name;
    if (!managerToSet) return;
    setInputValue(managerToSet);
  }, [activeManagerId]);

  return (
    <>
      <Input
        value={inputValue}
        isInputFocused={isInputFocused}
        setInputValue={setInputValue}
        setIsInputFocused={setIsInputFocused}
      />
      {isInputFocused && managersFilteredByInput.length && !activeManagerId && (
        <SearchList
          _ref={searchListItem}
          list={managersFilteredByInput}
          activeListIndex={activeListIndex}
        />
      )}
    </>
  );
});
