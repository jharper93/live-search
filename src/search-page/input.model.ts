import { action, makeAutoObservable } from "mobx";
import { getManagers } from "../api/managers";

const colorArray = ["#EAAE98", "#B3ABCF", "#7A6AA9", "#8CB3B1", "#F5C691"];
export class SearchRootModel {
  constructor() {
    makeAutoObservable(this);
  }

  data: any[] = [];
  inputValue: string = "";
  isInputFocused = false;
  activeListIndex: number = 0;
  activeManagerId: string | undefined;

  get removeNewManager() {
    if (!this.data) return [];
    return this.data.filter(
      ({ attributes: { lastName } }) => lastName !== "Manager"
    );
  }

  get managersArray(): IManagerList[] {
    return this.removeNewManager.map(
      ({ id, attributes: { name, firstName, lastName } }: IDataArray) => ({
        id,
        combinedName: `${firstName}${lastName}`,
        name,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@kinetar.com`,
        avatar: {
          text: `${firstName.charAt(0).toUpperCase()}${lastName
            .charAt(0)
            .toUpperCase()}`,
          color: colorArray[Math.floor(Math.random() * colorArray.length)],
        },
      })
    );
  }

  get managersFilteredByInput() {
    if (!this.inputValue) return this.managersArray;
    return this.managersArray.filter(
      ({ combinedName, name }) =>
        combinedName.includes(this.inputValue) || name.includes(this.inputValue)
    );
  }

  get managersListLength() {
    return this.managersFilteredByInput.length - 1;
  }

  get managerNameToSet() {
    return this.managersFilteredByInput.find(
      ({ id }) => id === this.activeManagerId
    )?.name;
  }

  get inputIsExactMatch() {
    return !!this.managersArray.find(({ name }) => name === this.inputValue);
  }

  @action setActiveListIndex = (value: this["activeListIndex"]) => {
    this.activeListIndex = value;
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

  @action keyEventHandler = (key: string) => {
    const isArrowUp = key === "ArrowUp";
    const isArrowDown = key === "ArrowDown";
    const isArrowKey = isArrowUp || isArrowDown;

    if (
      this.activeListIndex === undefined &&
      this.isInputFocused &&
      isArrowKey
    ) {
      return this.setActiveListIndex(0);
    }
    if (isArrowUp) this.increaseListItem(-1);
    if (isArrowDown) this.increaseListItem(1);
    if (key === "Enter") {
      if (this.activeListIndex === undefined) return;
      this.setActiveManagerId(
        this.managersFilteredByInput[this.activeListIndex].id
      );
    }
  };

  @action increaseListItem = (value: this["activeListIndex"]) => {
    if (!this.isInputFocused) return;
    if (typeof this.activeListIndex === "number" && typeof value === "number") {
      const sum = value + this.activeListIndex;
      if (sum < 0 || sum > this.managersListLength) return;
      this.activeListIndex = sum;
    }
  };

  @action setActiveManagerId = (id: string | undefined) => {
    this.activeManagerId = id;
  };
}

export const store = new SearchRootModel();

export interface IDataArray {
  id: string;
  attributes: {
    name: string;
    firstName: string;
    lastName: string;
  };
}

export interface IManagerList {
  id: string;
  combinedName: string;
  name: string;
  email: string;
  avatar: {
    text: string;
    color: string;
  };
}
