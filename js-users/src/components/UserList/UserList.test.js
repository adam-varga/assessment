import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import UserList from "./UserList";
import { renderWithRedux } from "../../testUtils";
import {
  createAction,
  GET_USERS__SUCCEEDED,
  CREATE_USER__SUCCEEDED,
  UPDATE_USER__SUCCEEDED,
} from "../../store/actions";
import { BrowserRouter as Router } from "react-router-dom";

afterEach(cleanup);

describe("User list", () => {
  let renderResult;

  beforeEach(() => {
    renderResult = renderWithRedux(
      <Router>
        <UserList pageSize={2} />
      </Router>
    );
  });

  it("renders loading screen by default", () => {
    const { getByText, asFragment } = renderResult;

    expect(getByText("Loading...")).toBeInTheDocument();
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
              first_name: "First",
              status: "active",
              created_at: "2014-01-10T08:28:49.030Z",
              updated_at: "2020-06-12T14:36:40.351Z",
              url: "http://1.json",
            },
            "2": {
              id: 2,
              last_name: "Person",
              first_name: "Second",
              status: "locked",
              created_at: "2014-01-10T08:28:49.059Z",
              updated_at: "2020-04-29T13:40:59.820Z",
              url: "http://2.json",
            },
            "3": {
              id: 3,
              last_name: "Person",
              first_name: "Third",
              status: "active",
              created_at: "2014-01-10T08:28:49.059Z",
              updated_at: "2020-04-29T13:40:59.820Z",
              url: "http://3.json",
            },
            "4": {
              id: 4,
              last_name: "Person",
              first_name: "Fourth",
              status: "active",
              created_at: "2014-01-10T08:28:49.030Z",
              updated_at: "2020-06-12T14:36:40.351Z",
              url: "http://4.json",
            },
          },
          userIds: ["1", "2", "3", "4"],
        })
      );
    });

    it("renders user list's first page", () => {
      const { queryByText, getByText, asFragment } = renderResult;

      expect(queryByText("Loading...")).toBeNull();

      expect(getByText("First Person")).toBeInTheDocument();
      expect(getByText("Second Person")).toBeInTheDocument();
      expect(queryByText("Third Person")).toBeNull();
      expect(queryByText("Fourth Person")).toBeNull();
      expect(asFragment()).toMatchSnapshot();
    });

    it("changes page after clicking page 2 button", () => {
      const { getByText, queryByText } = renderResult;

      const page2Button = getByText("2", { selector: "a" });

      fireEvent(
        page2Button,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );

      expect(queryByText("First Person")).toBeNull();
      expect(queryByText("Second Person")).toBeNull();
      expect(getByText("Third Person")).toBeInTheDocument();
      expect(getByText("Fourth Person")).toBeInTheDocument();
    });

    it("changes URL after clicking New button", () => {
      const { getByTestId } = renderResult;
      const newButton = getByTestId("new-button");

      expect(global.location.pathname).toBe("/");

      fireEvent(
        newButton,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );

      expect(global.location.pathname).toBe("/new");
    });

    it("adds newly added user as the first item of page 1", () => {
      const { getByText, queryByText, store } = renderResult;

      expect(getByText("First Person")).toBeInTheDocument();
      expect(getByText("Second Person")).toBeInTheDocument();
      expect(queryByText("New Person")).toBeNull();

      store.dispatch(
        createAction(CREATE_USER__SUCCEEDED, {
          user: {
            id: 5,
            last_name: "Person",
            first_name: "New",
            status: "active",
            created_at: "2014-01-10T08:28:49.030Z",
            updated_at: "2020-06-12T14:36:40.351Z",
            url: "http://5.json",
          },
        })
      );

      expect(getByText("First Person")).toBeInTheDocument();
      expect(queryByText("Second Person")).toBeNull();
      expect(getByText("New Person")).toBeInTheDocument();
    });

    it("updates user after update request successfully returned", () => {
      const { getByText, queryByText, store } = renderResult;

      expect(getByText("First Person")).toBeInTheDocument();
      expect(queryByText("Updated Person")).toBeNull();

      store.dispatch(
        createAction(UPDATE_USER__SUCCEEDED, {
          user: {
            id: 1,
            last_name: "Person",
            first_name: "Updated",
            status: "active",
            created_at: "2014-01-10T08:28:49.030Z",
            updated_at: "2020-06-12T14:36:40.351Z",
            url: "http://1.json",
          },
        })
      );

      expect(queryByText("First Person")).toBeNull();
      expect(getByText("Updated Person")).toBeInTheDocument();
    });
  });
});
