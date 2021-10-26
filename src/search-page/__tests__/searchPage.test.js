import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SearchPage } from "../searchPage";
import { TextInput } from "../partials/input";
import { Provider } from "mobx-react";
import { SearchRootModel } from "../input.model";
import { ModelTestingPage } from "../testComponentMocks/modelTesting";

//Test simple rendering

test("renders Search component", () => {
  render(<SearchPage />);
});

test("title renders correct text", () => {
  const { getByTestId } = render(<SearchPage />);
  const titleEl = getByTestId("title-manager");
  expect(titleEl.textContent).toBe("Manager search");
});

test("renders TextInput component", () => {
  render(<TextInput />);
});

//Test some initial values of model

const renderWithStore = (store) => render(<ModelTestingPage store={store} />);
const store = new SearchRootModel();

it("renders correct initial inputValue", () => {
  const { getByTestId } = renderWithStore(store);

  expect(getByTestId("inputValue")).toHaveTextContent("");
});

it("renders correct activeListIndex", () => {
  const { getByTestId } = renderWithStore(store);

  expect(getByTestId("activeListIndex")).toHaveTextContent(0);
});

//Test some (mock) functions

// test("to remove New Manager from Array", () => {
//   expect((mockArray = [{ lastName: "Smith" }, { lastName: "Manager" }]) => {
//     mockArray.filter(({ attributes: { lastName } }) => lastName !== "Manager");
//   }).toBe([{ lastName: "Smith" }]);
// });
