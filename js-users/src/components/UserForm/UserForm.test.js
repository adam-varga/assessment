import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import UserForm from "./UserForm";
import { renderWithRedux } from "../../testUtils";
import {
  createAction,
  GET_USERS__SUCCEEDED,
  CREATE_USER__SUCCEEDED,
  UPDATE_USER__SUCCEEDED,
  UPDATE_USER__REQUEST,
  CREATE_USER__REQUEST,
  GET_USERS__REQUEST,
} from "../../store/actions";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import reducer from "../../store/reducers";

afterEach(cleanup);

describe("Create user form", () => {
  let renderResult;
  let mockClose = jest.fn();
  let store;

  beforeEach(() => {
    store = createStore(reducer);

    jest.spyOn(store, "dispatch");

    renderResult = renderWithRedux(
      <Router>
        <UserForm close={mockClose} />
      </Router>,
      {
        store,
      }
    );

    renderResult.store.dispatch(createAction(GET_USERS__REQUEST));
  });

  it("renders empty input fields by default regardless of whether users have been loaded", () => {
    const { getByText, queryByText, getByTestId, asFragment } = renderResult;

    expect(getByText("Create user")).toBeInTheDocument();
    expect(queryByText("Loading...")).toBeNull();

    const firstNameInput = getByTestId("input_first_name");
    const lastNameInput = getByTestId("input_last_name");

    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameInput.value).toBe("");

    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput.value).toBe("");

    expect(asFragment()).toMatchSnapshot();
  });

  it("calls close prop function on Cancel button click", () => {
    const { getByTestId } = renderResult;

    const cancelButton = getByTestId("cancel-button");

    fireEvent(
      cancelButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(mockClose).toHaveBeenCalled();
  });

  it("dispatches CREATE_USER__REQUEST action on Save button click", () => {
    const { getByTestId } = renderResult;

    const saveButton = getByTestId("save-button");
    const firstNameInput = getByTestId("input_first_name");
    const lastNameInput = getByTestId("input_last_name");

    fireEvent.change(firstNameInput, { target: { value: "New" } });
    fireEvent.change(lastNameInput, { target: { value: "Person" } });

    store.dispatch.mockClear();

    expect(saveButton).toBeInTheDocument();

    fireEvent(
      saveButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      createAction(CREATE_USER__REQUEST, {
        last_name: "Person",
        first_name: "New",
        status: "active",
      })
    );
  });
});

describe("Edit user form", () => {
  let renderResult;
  let mockClose = jest.fn();
  let store;

  beforeEach(() => {
    store = createStore(reducer);

    jest.spyOn(store, "dispatch");

    renderResult = renderWithRedux(
      <Router>
        <UserForm id="1" close={mockClose} />
      </Router>,
      {
        store,
      }
    );

    renderResult.store.dispatch(createAction(GET_USERS__REQUEST));
  });

  it("renders loading screen by default", () => {
    const { getByText, queryByTestId, asFragment } = renderResult;

    expect(getByText("Edit user")).toBeInTheDocument();
    expect(getByText("Loading...")).toBeInTheDocument();
    expect(queryByTestId("input_first_name")).toBeNull();
    expect(queryByTestId("input_last_name")).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });

  describe("after users request returned", () => {
    beforeEach(() => {
      const { store } = renderResult;

      store.dispatch(
        createAction(GET_USERS__SUCCEEDED, {
          usersById: {
            "1": {
              id: 1,
              last_name: "Person",
              first_name: "Test",
              status: "active",
              created_at: "2014-01-10T08:28:49.030Z",
              updated_at: "2020-06-12T14:36:40.351Z",
              url: "http://1.json",
            },
          },
          userIds: ["1"],
        })
      );
    });

    it("renders edit form prefilled with user data", () => {
      const { getByText, queryByText, getByTestId, asFragment } = renderResult;

      expect(getByText("Edit user")).toBeInTheDocument();
      expect(queryByText("Loading...")).toBeNull();

      const firstNameInput = getByTestId("input_first_name");
      const lastNameInput = getByTestId("input_last_name");

      expect(firstNameInput).toBeInTheDocument();
      expect(firstNameInput.value).toBe("Test");

      expect(lastNameInput).toBeInTheDocument();
      expect(lastNameInput.value).toBe("Person");

      expect(asFragment()).toMatchSnapshot();
    });

    it("calls close prop function on Cancel button click", () => {
      const { getByTestId } = renderResult;

      const cancelButton = getByTestId("cancel-button");

      fireEvent(
        cancelButton,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );

      expect(mockClose).toHaveBeenCalled();
    });

    it("dispatches UPDATE_USER__REQUEST action on Save button click", () => {
      const { getByTestId } = renderResult;

      const saveButton = getByTestId("save-button");
      const firstNameInput = getByTestId("input_first_name");
      const lastNameInput = getByTestId("input_last_name");

      fireEvent.change(firstNameInput, { target: { value: "Modified" } });
      fireEvent.change(lastNameInput, { target: { value: "Human" } });

      store.dispatch.mockClear();

      expect(saveButton).toBeInTheDocument();

      fireEvent(
        saveButton,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );

      expect(store.dispatch).toHaveBeenCalledWith(
        createAction(UPDATE_USER__REQUEST, {
          id: 1,
          last_name: "Human",
          first_name: "Modified",
          status: "active",
          created_at: "2014-01-10T08:28:49.030Z",
          updated_at: "2020-06-12T14:36:40.351Z",
          url: "http://1.json",
        })
      );
    });
  });
});
