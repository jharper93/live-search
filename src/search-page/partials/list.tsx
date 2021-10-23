import React from "react";
import styled from "styled-components";
import { IManagerList } from "../input.model";

interface IProps {
  list: IManagerList[];
  activeListIndex: number | undefined;
}

export const SearchList: React.FC<IProps> = ({ list, activeListIndex }) => {
  return (
    <ul>
      {list.map(({ firstName, lastName, department, id }, i) => (
        <$ListItem
          isActive={i === activeListIndex}
          key={id}
        >{`${firstName} ${lastName} (${department})`}</$ListItem>
      ))}
    </ul>
  );
};

const $ListItem = styled.li`
  background-color: ${({ isActive }: { isActive: boolean }) =>
    isActive ? "green" : "white"};
`;
