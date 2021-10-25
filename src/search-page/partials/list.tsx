import React from "react";
import styled from "styled-components";
import { IManagerList } from "../input.model";

interface IProps {
  _ref: React.RefObject<any>;
  list: IManagerList[];
  activeListIndex: number | undefined;
}

export const SearchList: React.FC<IProps> = ({
  _ref,
  list,
  activeListIndex,
}) => {
  // const refs = list.reduce((acc, value) => {
  //   acc.assign(React.createRef();)
  //   return acc;
  // }, {});

  // React.useEffect(() => {
  //   if (!_ref) return;
  //   if (!activeListIndex) return;
  //   refs[activeListIndex].current.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'start',
  //   });
  // }, [activeListIndex]);

  return (
    <List listLength={list.length}>
      {list.map(({ name, email, avatarText, id }, i) => (
        <ListItem
          ref={i === activeListIndex ? _ref : null}
          isActive={i === activeListIndex}
          key={id}
        >
          <Avatar>{avatarText}</Avatar>
          <TextContainer>
            <div>{name}</div>
            <div className="email">{email}</div>
          </TextContainer>
        </ListItem>
      ))}
    </List>
  );
};

const List = styled.div`
  width: 350px;
  height: ${({ listLength }: { listLength: number }) =>
    listLength === 1 ? "71px" : "142px"};
  overflow-y: auto;
  margin-top: 10px;
  border-radius: 7px;
  border: solid 2px rgba(215, 215, 215);
  box-shadow: 0px -1px 7px 1px rgba(215, 215, 215, 0.7);
`;

const ListItem = styled.li`
  display: flex;
  height: 40px;
  padding: 15px 30px;
  color: ${({ isActive }: { isActive: boolean }) =>
    isActive ? "#ffffff" : "#000000"};
  background-color: ${({ isActive }: { isActive: boolean }) =>
    isActive ? "#29e6d2" : "white"};
  list-style-type: none;
  border-bottom: solid 1px lightgray;

  .email {
    font-size: 12px;
    color: ${({ isActive }: { isActive: boolean }) =>
      isActive ? "#ffffff" : "#787878"};
  }

  :first-child {
    border-radius: 6px 6px 0 0;
  }
  :last-child {
    border-bottom: none;
    border-radius: 0 0 6px 6px;
  }
`;

const Avatar = styled.div`
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24;
  height: 40px;
  width: 40px;
  border-radius: 5px;
  background: #29e6d2;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 15px;
`;
