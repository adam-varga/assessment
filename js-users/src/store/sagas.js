import { put, takeEvery, all, call } from "redux-saga/effects";
import {
  createAction,
  GET_USERS__REQUEST,
  GET_USERS__SUCCEEDED,
  GET_USERS__FAILED,
  UPDATE_USER__REQUEST,
  UPDATE_USER__SUCCEEDED,
  UPDATE_USER__FAILED,
  CREATE_USER__REQUEST,
  CREATE_USER__SUCCEEDED,
  CREATE_USER__FAILED,
} from "./actions";

function* getUsers() {
  yield takeEvery(GET_USERS__REQUEST, function* () {
    try {
      let users = yield fetch(
        "http://js-assessment-backend.herokuapp.com/users"
      );

      users = yield users.json();

      const usersById = {};
      const userIds = [];

      users.forEach((user) => {
        usersById[user.id] = user;
        userIds.push(`${user.id}`);
      });

      yield put(
        createAction(GET_USERS__SUCCEEDED, {
          usersById,
          userIds,
        })
      );
    } catch (e) {
      const error = e.json();
      yield put(createAction(GET_USERS__FAILED, { error }));
    }
  });
}

function* updateUser() {
  yield takeEvery(UPDATE_USER__REQUEST, function* (action) {
    const { first_name, last_name, status } = action.payload;

    try {
      const response = yield fetch(
        `http://js-assessment-backend.herokuapp.com/users/${action.payload.id}`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name,
            last_name,
            status,
          }),
        }
      );

      if (response.status === 204) {
        yield put(
          createAction(UPDATE_USER__SUCCEEDED, {
            user: action.payload,
          })
        );
      } else {
        throw response;
      }
    } catch (e) {
      const error = yield e.json();

      yield put(createAction(UPDATE_USER__FAILED, { error }));
    }
  });
}

function* createUser() {
  yield takeEvery(CREATE_USER__REQUEST, function* (action) {
    const { first_name, last_name, status } = action.payload;

    try {
      let response = yield call(
        fetch,
        `http://js-assessment-backend.herokuapp.com/users`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name,
            last_name,
            status,
          }),
        }
      );

      if (response.status === 201) {
        const user = yield response.json();

        yield put(
          createAction(CREATE_USER__SUCCEEDED, {
            user,
          })
        );
      } else {
        throw response;
      }
    } catch (e) {
      const error = yield e.json();

      yield put(createAction(CREATE_USER__FAILED, { error }));
    }
  });
}

export default function* rootSaga() {
  yield all([getUsers(), updateUser(), createUser()]);
}
