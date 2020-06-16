import { createStore } from "redux";
import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import reducer from "./store/reducers";

export function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
