import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { useStore } from "../root.model";
import { TextInput } from "./partials/input";
import { SearchList } from "./partials/list";
import peakLogo from "../images/logo-green.png";
import { Footer } from "../footer/footer";

export const SearchPage: React.FC = observer(() => {
  const {
    searchPage: {
      inputValue,
      isInputFocused,
      activeListIndex,
      activeManagerId,
      managersFilteredByInput,
      managersListLength,
      inputIsExactMatch,
      managerNameToSet,
      setActiveManagerId,
      setIsInputFocused,
      getMangers,
      setInputValue,
      setActiveListIndex,
      keyEventHandler,
    },
  } = useStore();

  React.useEffect(() => {
    getMangers();
    window.addEventListener("keydown", ({ key }) => keyEventHandler(key));
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    setActiveListIndex(0);
    // eslint-disable-next-line
  }, [managersListLength]);

  React.useEffect(() => {
    if (!inputIsExactMatch && !!activeManagerId) setActiveManagerId(undefined);
    // eslint-disable-next-line
  }, [inputIsExactMatch]);

  React.useEffect(() => {
    if (!managerNameToSet) return;
    setInputValue(managerNameToSet);
    // eslint-disable-next-line
  }, [managerNameToSet]);

  return (
    <>
      <TopBackground>
        <img src={peakLogo} alt="peakonLogo" />
      </TopBackground>
      <Container>
        <Title>Manager Search</Title>
        <TextInput
          value={inputValue}
          isInputFocused={isInputFocused}
          setInputValue={setInputValue}
          setIsInputFocused={(isFocused) => {
            setIsInputFocused(isFocused);
            setActiveListIndex(0);
          }}
        />
        {isInputFocused &&
          managersFilteredByInput.length &&
          !activeManagerId && (
            <SearchList
              list={managersFilteredByInput}
              activeListIndex={activeListIndex}
              setActiveManagerId={setActiveManagerId}
              setActiveListIndex={setActiveListIndex}
            />
          )}
      </Container>
      <Footer />
    </>
  );
});

const TopBackground = styled.div`
  width: 100%;
  height: 50vh;
  background-color: #0d3f29;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  height: 400px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: -140px;
`;

const Title = styled.div`
  font-size: 36px;
  color: white;
  font-weight: bolder;
  margin-bottom: 60px;
`;
