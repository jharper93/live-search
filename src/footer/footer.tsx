import React from "react";
import mobxLogo from "../images/mobx-logo-png-transparent.png";
import reactLogo from "../images/react-logo.png";
import tsLogo from "../images/typescript.png";
import styledComponentsLogo from "../images/styled-components.png";
import styled from "styled-components";

export const Footer: React.FC = () => {
  return (
    <Container>
      <Name>James Harper</Name>
      <h4>Created using:</h4>
      <img src={reactLogo} height="30px" alt="reactLogo" />
      <img src={tsLogo} height="30px" alt="tsLogo" />
      <img src={mobxLogo} height="20px" alt="MobXLogo" />
      <img
        className="styledCompLogo"
        src={styledComponentsLogo}
        height="30px"
        alt="styledComponentsLogo"
      />
    </Container>
  );
};

const Container = styled.footer`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: 50px;
  width: calc(100vw - 200px);
  padding: 15px 0;
  margin: 0px 100px;
  border-top: solid 2px rgba(33, 94, 35, 0.3);

  .styledCompLogo {
    filter: grayscale(1);
  }
`;

const Name = styled.div`
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding-right: 120px;
  border-right: solid 2px rgba(33, 94, 35, 0.3);
`;
