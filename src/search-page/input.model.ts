import { action, makeAutoObservable } from "mobx";
import { getManagers } from "../api/managers";

export class SearchRootModel {
  constructor() {
    makeAutoObservable(this);
  }

  data: any[] = [];
  inputValue: string = "";
  isInputFocused = false;
  activeListIndex: number | undefined;
  activeManagerId: string | undefined;

  get removeNewManager() {
    if (!this.data) return [];
    return this.data.filter((m) =>
      m.attributes.lastName === "Manager" ? false : true
    );
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
        email: `${firstName}.${lastName}@kinetar.com`,
        avatarText: `${firstName.charAt(0)}${lastName.charAt(0)}`,
      })
    );
  }

  get managersFilteredByInput() {
    if (!this.inputValue) return this.managersArray;
    return this.managersArray.filter(({ combinedName, name }) => {
      if (
        combinedName.includes(this.inputValue) ||
        name.includes(this.inputValue)
      ) {
        return true;
      }
      return false;
    });
  }

  get managersListLength() {
    return this.managersFilteredByInput.length - 1;
  }

  @action keyEventHandler = (key: string) => {
    const isArrowUp = key === "ArrowUp";
    const isArrowDown = key === "ArrowDown";
    const isArrowKey = isArrowUp || isArrowDown;

    if (
      this.activeListIndex === undefined &&
      this.isInputFocused &&
      isArrowKey
    ) {
      return this.setActiveListItem(0);
    }
    isArrowDown && this.increaseListItem(1);
    isArrowUp && this.increaseListItem(-1);
    key === "Enter" && this.setActiveManagerId(true);
  };

  @action increaseListItem = (value: this["activeListIndex"]) => {
    if (typeof this.activeListIndex === "number" && typeof value === "number") {
      if (!this.isInputFocused) return;
      const sum = value + this.activeListIndex;
      if (sum < 0 || sum > this.managersListLength) return;
      this.activeListIndex = sum;
    }
  };

  @action setActiveManagerId = (setValue: boolean) => {
    if (!setValue) return (this.activeManagerId = undefined);
    if (this.activeListIndex === undefined) return;
    this.activeManagerId =
      this.managersFilteredByInput[this.activeListIndex].id;

    this.activeListIndex = undefined;
  };

  @action setActiveListItem = (value: this["activeListIndex"]) => {
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
}

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
  email: string;
  avatarText: string;
}
