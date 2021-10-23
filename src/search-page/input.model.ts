import { action, makeAutoObservable } from "mobx";
import { getManagers } from "../api/managers";

export interface IDataArray {
  id: string;
  attributes: {
    name: string;
    firstName: string;
    lastName: string;
    Department: string;
  };
}

export interface IManagerList {
  id: string;
  combinedName: string;
  name: string;
  firstName: string;
  lastName: string;
  department: string;
}

export class SearchRootModel {
  constructor() {
    makeAutoObservable(this);
  }

  data: any[] = [];
  inputValue: string = "";
  isInputFocused = false;
  activeListIndex: number | undefined;

  get removeNewManager() {
    if (!this.data) return [];
    return this.data.filter((m) => {
      return m.attributes.lastName === "Manager" ? false : true;
    });
  }

  get managersArray(): IManagerList[] {
    return this.removeNewManager.map(
      ({
        id,
        attributes: { name, firstName, lastName, Department },
      }: IDataArray) => ({
        id,
        combinedName: `${firstName}${lastName}`,
        name,
        firstName,
        lastName,
        department: Department,
      })
    );
  }

  get managersFilteredByInput() {
    if (!this.inputValue) return this.managersArray;
    return this.managersArray.filter(({ combinedName }) =>
      combinedName.includes(this.inputValue) ? true : false
    );
  }

  get managersListLength() {
    return this.managersFilteredByInput.length - 1;
  }

  @action keyEventHandler = ({ key }: KeyboardEvent) => {
    const isFocusedNoInput =
      this.activeListIndex === undefined && this.isInputFocused;
    const isArrowKey = key === "ArrowDown" || key === "ArrowUp";

    console.log({
      isActiveListIndexUndefined: this.activeListIndex === undefined,
      isInputFocused: this.isInputFocused,
      isArrowKey,
    });

    isFocusedNoInput && isArrowKey && this.setActiveListItem(0);
    key === "ArrowDown" && this.increaseListItem(1);
    key === "ArrowUp" && this.increaseListItem(-1);
    key === "Enter" && console.log(key);
  };

  @action setActiveListItem = (value: this["activeListIndex"]) => {
    this.activeListIndex = value;
  };

  @action increaseListItem = (value: this["activeListIndex"]) => {
    if (typeof this.activeListIndex === "number" && typeof value === "number") {
      if (!this.isInputFocused) return;
      const sum = value + this.activeListIndex;
      if (sum < 0 || sum > this.managersListLength) return;
      console.log({ value, activeListIndex: this.activeListIndex, sum });
      this.activeListIndex = sum;
    }
  };

  @action setInputValue = (value: this["inputValue"]) => {
    this.inputValue = value;
  };

  @action setIsInputFocused = (value: this["isInputFocused"]) => {
    this.isInputFocused = value;
  };

  @action getMangers = async () => {
    const {
      data: { data },
    } = await getManagers();

    this.data = data;
  };
}
