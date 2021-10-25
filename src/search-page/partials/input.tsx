import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";

interface IProps {
  value: string;
  isInputFocused: boolean;
  setIsInputFocused(value: boolean): void;
  setInputValue(eventTargetValue: string): void;
}

export const TextInput: React.FC<IProps> = observer(
  ({ value, isInputFocused, setInputValue, setIsInputFocused }) => {
    return (
      <Input
        isInputFocused={isInputFocused}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        type="text"
        placeholder="Choose Manager"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.currentTarget.value)
        }
      />
    );
  }
);

const Input = styled.input<{
  isInputFocused: boolean;
  type: string;
  value: string;
}>`
  width: 320px;
  height: 45px;
  padding: 0 15px;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  border: solid 2px #215e23;
  box-shadow: 0px 5px 4px 0px rgb(141 141 141);
  :focus {
    border: solid 2px #3e9641;
  }
`;
