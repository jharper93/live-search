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

  // React.useEffect(() => {
  //   if (activeListIndex === undefined) return;

  //   if (!myRef.current) return;
  //   myRef.current.scrollIntoView();
  // }, [activeListIndex]);

  return (
    <>
      <List listLength={list.length}>
        {list.map(({ name, email, avatarText, id }, i) => (
          <ListItem
            ref={i === activeListIndex ? myRef : null}
            isActive={i === activeListIndex}
            key={id}
            onMouseEnter={() => setActiveListIndex(i)}
            onMouseDown={() => setActiveManagerId(id)}
          >
            <Avatar className="avatar" isActive={i === activeListIndex}>
              {avatarText}
            </Avatar>
            <TextContainer>
              <div>{name}</div>
              <div className="email">{email}</div>
            </TextContainer>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const List = styled.div`
  position: absolute;
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
    color: #0d3f29;
    background-color: white;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    position: absolute;
    background-color: #0d3f29;
    border-radius: 0;
  }
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 17px 30px;
  color: ${({ isActive }: { isActive: boolean }) =>
    isActive ? "#ffffff" : "#000000"};
  background-color: ${({ isActive }: { isActive: boolean }) =>
    isActive ? "#0D3F29" : "white"};
  list-style-type: none;
  border-bottom: solid 1px lightgray;

  &:hover {
    color: #ffffff;
    background-color: #0d3f29;
    .email {
      color: #ffffff;
    }
    .avatar {
      color: #0d3f29;
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

const Avatar = styled.div<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? "#0D3F29" : "#ffffff")};
  background: ${({ isActive }) => (isActive ? "#ffffff" : "#0D3F29")};
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

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 15px;
`;
