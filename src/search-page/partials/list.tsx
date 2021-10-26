import React from "react";
import styled from "styled-components";
import { IManagerList } from "../input.model";

interface IProps {
  list: IManagerList[];
  activeListIndex: number | undefined;
  setActiveManagerId(id: string): void;
  setActiveListIndex(id: number): void;
}

export const SearchList: React.FC<IProps> = ({
  list,
  activeListIndex,
  setActiveManagerId,
  setActiveListIndex,
}) => {
  const myRef = React.useRef<any>(null);

  // Uncomment useEffect below,
  // selected list item (by up/down arrow keys) auto scrolls to be visible
  // Beware: it is buggy

  // React.useEffect(() => {
  //   if (activeListIndex === undefined) return;
  //   if (!myRef.current) return;
  //   myRef.current.scrollIntoView();
  // }, [activeListIndex]);

  return (
    <>
      <List listLength={list.length}>
        {list.map(({ name, email, id, avatar: { text, color } }, i) => {
          const isActive = i === activeListIndex;

          return (
            <ListItem
              key={id}
              isActive={isActive}
              color={color}
              ref={isActive ? myRef : null}
              onMouseEnter={() => setActiveListIndex(i)}
              onMouseDown={() => setActiveManagerId(id)}
            >
              <Avatar className="avatar" isActive={isActive} color={color}>
                <Offset>{text}</Offset>
              </Avatar>
              <TextContainer>
                <div>{name}</div>
                <div className="email">{email}</div>
              </TextContainer>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

const List = styled.div`
  position: relative;
  width: 350px;
  height: ${({ listLength }: { listLength: number }) =>
    listLength === 1 ? "75px" : "150px"};
  overflow-y: auto;
  margin-top: 10px;
  border-radius: 7px;
  border: solid 2px rgba(215, 215, 215);
  box-shadow: 0px -1px 7px 1px rgba(215, 215, 215, 0.7);

  &::-webkit-scrollbar {
    width: 0.4em;
    height: 0.5em;
    color: #286b4d;
    background-color: white;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    position: absolute;
    background-color: #286b4d;
    border-radius: 5px;
  }
`;

const Offset = styled.div`
  margin-bottom: 4px;
`;

const Avatar = styled.div<{ isActive: boolean; color: string }>`
  color: ${({ isActive, color }) => (isActive ? color : "#ffffff")};
  background: ${({ isActive, color }) => (isActive ? "#ffffff" : color)};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24;
  font-weight: 600;
  height: 38px;
  width: 38px;
  border-radius: 4px;
  margin-bottom: -5px;
`;

const ListItem = styled.div<{ isActive: boolean; color: string }>`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 17px 30px;
  color: ${({ isActive }: { isActive: boolean }) =>
    isActive ? "#ffffff" : "#000000"};
  background-color: ${({ isActive, color }) => (isActive ? color : "white")};
  list-style-type: none;
  border-bottom: solid 1px lightgray;

  &:hover {
    color: #ffffff;
    background-color: ${({ color }) => color};
    .email {
      color: #ffffff;
    }
    ${Avatar} {
      color: ${({ color }) => color};
      background-color: #ffffff;
    }
    cursor: pointer;
  }

  .email {
    font-size: 12px;
    color: ${({ isActive }: { isActive: boolean }) =>
      isActive ? "#ffffff" : "#787878"};
  }

  :first-child {
    border-radius: 6px 0px 0 0;
  }
  :last-child {
    border-bottom: none;
    border-radius: 0 0 0px 6px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 15px;
`;
