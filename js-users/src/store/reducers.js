import { GET_USERS__SUCCEEDED } from "./actions";
import { combineReducers } from "redux";

// USERS

function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS__SUCCEEDED: {
      const { usersById, userIds } = action.payload;

      return {
        usersById,
        userIds,
      };
    }
    default:
      return state;
  }
}

// REQUESTS

const REQUEST_REGEXPS = {
  START: /__REQUEST$/,
  SUCCESS: /__SUCCEEDED$/,
  FAILURE: /__FAILED$/,
};

function getRequestActionType(actionType, regExp) {
  return `${actionType.substring(0, actionType.match(regExp).index)}__REQUEST`;
}

function requests(state = {}, action) {
  if (action.type.match(REQUEST_REGEXPS.START)) {
    return {
      ...state,
      [action.type]: {
        loading: true,
      },
    };
  }

  if (action.type.match(REQUEST_REGEXPS.SUCCESS)) {
    return {
      ...state,
      [getRequestActionType(action.type, REQUEST_REGEXPS.SUCCESS)]: {
        loading: false,
      },
    };
  }

  if (action.type.match(REQUEST_REGEXPS.FAILURE)) {
    return {
      ...state,
      [getRequestActionType(action.type, REQUEST_REGEXPS.FAILURE)]: {
        loading: false,
        error: action.payload.error,
      },
    };
  }

  return state;
}

export default combineReducers({
  users,
  requests,
});
