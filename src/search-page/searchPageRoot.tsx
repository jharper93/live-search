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
  }, []);

  React.useEffect(() => {
    setActiveListItem(undefined);
  }, [managersListLength]);

  React.useEffect(() => {
    window.addEventListener("keydown", keyEventHandler);

    return () => {
      window.addEventListener("keydown", keyEventHandler);
    };
  }, []);

  console.log({ activeListIndex });

  return (
    <>
      <Input
        value={inputValue}
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
