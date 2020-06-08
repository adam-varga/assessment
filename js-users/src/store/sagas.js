import { put, takeEvery, all } from "redux-saga/effects";
import {
  createAction,
  GET_USERS__REQUEST,
  GET_USERS__SUCCEEDED,
  GET_USERS__FAILED,
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
    } catch (error) {
      yield put(createAction(GET_USERS__FAILED, { error }));
    }
  });
}

export default function* rootSaga() {
  yield all([getUsers()]);
}
