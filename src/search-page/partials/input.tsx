import { observer } from "mobx-react-lite";
import React from "react";

interface IProps {
  value: string;
  setIsInputFocused(value: boolean): void;
  setInputValue(eventTargetValue: string): void;
}

export const Input: React.FC<IProps> = observer(
  ({ value, setInputValue, setIsInputFocused }) => (
    <input
      onFocus={() => setIsInputFocused(true)}
      onBlur={() => setIsInputFocused(false)}
      type="text"
      value={value}
      onChange={(e) => setInputValue(e.target.value)}
    />
  )
);
