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
  ({ value, isInputFocused, setInputValue, setIsInputFocused }) => {
    return (
      <TextInput
        isInputFocused={isInputFocused}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.currentTarget.value)
        }
      />
    );
  }
);

const TextInput = styled.input<{
  isInputFocused: boolean;
  type: string;
  value: string;
}>`
  width: 350px;
  height: 40px;
  padding: 0 15px;
  border-radius: 5px;
  font-size: 16px;
  border: solid 2px;
  border-color: ${({ isInputFocused }) => (isInputFocused ? "green" : "blue")};
`;
