import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import "../App.css";
import { useStore } from "../root.model";
import { TextInput } from "./partials/input";
import { SearchList } from "./partials/list";
import peakLogo from "../images/logo-green.png";
import mobxLogo from "../images/mobx-logo-png-transparent.png";
import reactLogo from "../images/react-logo.png";
import tsLogo from "../images/typescript.png";
import styledComponentsLogo from "../images/styled-components.png";

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
      setActiveListIndex,
      keyEventHandler,
    },
  } = useStore();

  React.useEffect(() => {
    getMangers();
    window.addEventListener("keydown", ({ key }) => keyEventHandler(key));
  }, []);

  React.useEffect(() => {
    setActiveListIndex(0);
  }, [managersListLength]);

  React.useEffect(() => {
    !isInputFocused && setActiveListIndex(0);
  }, [isInputFocused]);

  React.useEffect(() => {
    const exactMatch = managersArray.find(({ name }) => name === inputValue);
    if (exactMatch) return;
    setActiveManagerId(undefined);
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
      <TopBackground>
        <img src={peakLogo} alt="peakonLogo" />
        <Container>
          <TextInput
            value={inputValue}
            isInputFocused={isInputFocused}
            setInputValue={setInputValue}
            setIsInputFocused={setIsInputFocused}
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
      </TopBackground>
      <Footer>
        <img src={mobxLogo} height="50px" alt="MobXLogo" />
        <img src={tsLogo} height="50px" alt="MobXLogo" />
        <img src={reactLogo} height="50px" alt="MobXLogo" />
        <img src={styledComponentsLogo} height="50px" alt="MobXLogo" />
      </Footer>
    </>
  );
});

const Container = styled.div`
  margin-bottom: -23px;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  bottom: 0;
  height: 50px;
  width: calc(100vw - 200px);
  padding: 15px 0;
  margin: 0px 100px;
  border-top: solid 2px #215e23;
`;

const TopBackground = styled.div`
  width: 100%;
  height: 50vh;
  background-color: #0d3f29;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;
