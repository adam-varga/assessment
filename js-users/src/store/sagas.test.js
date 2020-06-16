import { expectSaga } from "redux-saga-test-plan";
import {
  createAction,
  UPDATE_USER__REQUEST,
  UPDATE_USER__SUCCEEDED,
  UPDATE_USER__FAILED,
  GET_USERS__REQUEST,
  GET_USERS__SUCCEEDED,
  GET_USERS__FAILED,
  CREATE_USER__REQUEST,
  CREATE_USER__SUCCEEDED,
  CREATE_USER__FAILED,
} from "./actions";

import rootSaga from "./sagas";

describe("sagas", () => {
  describe("update user", () => {
    const user = {
      id: 1,
      last_name: "Person",
      first_name: "First",
      status: "active",
      created_at: "2014-01-10T08:28:49.030Z",
      updated_at: "2020-06-12T14:36:40.351Z",
      url: "http://1.json",
    };

    it("dispatches UPDATE_USER__SUCCEEDED if API returns successfully", () => {
      global.fetch = jest.fn().mockImplementation((url) =>
        Promise.resolve({
          status: 204,
        })
      );

      return expectSaga(rootSaga)
        .put(
          createAction(UPDATE_USER__SUCCEEDED, {
            user,
          })
        )
        .dispatch(createAction(UPDATE_USER__REQUEST, user))
        .run();
    });

    it("dispatches UPDATE_USER__FAILED if API returns with error", () => {
      global.fetch = jest.fn().mockImplementation((url) =>
        Promise.resolve({
          status: 422,
          json: () => Promise.resolve("this is an error"),
        })
      );

      return expectSaga(rootSaga)
        .put(
          createAction(UPDATE_USER__FAILED, {
            error: "this is an error",
          })
        )
        .dispatch(createAction(UPDATE_USER__REQUEST, user))
        .run();
    });
  });

  // TODO: test rest of the sagas in similar fashion
});
