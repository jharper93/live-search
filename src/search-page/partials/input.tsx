import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";

interface IProps {
  value: string;
  isInputFocused: boolean;
  setIsInputFocused(value: boolean): void;
  setInputValue(eventTargetValue: string): void;
}

export const Input: React.FC<IProps> = observer(
  ({ value, isInputFocused, setInputValue, setIsInputFocused }) => (
    <TextInput
      onFocus={() => setIsInputFocused(true)}
      onBlur={() => setIsInputFocused(false)}
      type="text"
      value={value}
      onChange={(e) => setInputValue(e.target.value)}
    />
  )
);

const TextInput = styled.input`
  width: 350px;
  height: 40px;
  padding: 0 15px;
  border-radius: 5px;
  font-size: 16px;
  border: solid 2px;
`;
