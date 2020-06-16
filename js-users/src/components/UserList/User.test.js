import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import User from "./User";
import { renderWithRedux } from "../../testUtils";
import { createAction, UPDATE_USER__REQUEST } from "../../store/actions";
import { createStore } from "redux";
import reducer from "../../store/reducers";
import { BrowserRouter as Router } from "react-router-dom";

afterEach(cleanup);

describe("User", () => {
  let renderResult;
  let store;
  const userProps = {
    id: 1,
    last_name: "Person",
    first_name: "Test",
    status: "locked",
    created_at: "2014-01-10T08:28:49.030Z",
    updated_at: "2020-06-12T14:36:40.351Z",
    url: "http://1.json",
  };

  beforeEach(() => {
    store = createStore(reducer);

    store.dispatch = jest.fn();

    renderResult = renderWithRedux(
      <Router>
        <User user={userProps} />
      </Router>,
      { store }
    );
  });

  it("renders correctly", () => {
    const { getByText, asFragment } = renderResult;

    expect(getByText("Test Person")).toBeInTheDocument();
    expect(
      getByText(new Date(userProps.created_at).toLocaleDateString())
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("dispatches UPDATE_USER__REQUEST on status toggle button click", () => {
    const { getByTestId, store } = renderResult;
    const statusToggleButton = getByTestId(
      `toggle-user-status-button_${userProps.id}`
    );

    fireEvent(
      statusToggleButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      createAction(UPDATE_USER__REQUEST, {
        ...userProps,
        status: "active",
      })
    );
  });

  it("changes URL after clicking Edit button", () => {
    const { getByTestId } = renderResult;
    const editButton = getByTestId(`edit-user-button_${userProps.id}`);

    expect(global.location.pathname).toBe("/");

    fireEvent(
      editButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(global.location.pathname).toBe(`/edit/${userProps.id}`);
  });
});
