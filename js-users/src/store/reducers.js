import { combineReducers } from "redux";
import {
  GET_USERS__SUCCEEDED,
  UPDATE_USER__SUCCEEDED,
  CREATE_USER__SUCCEEDED,
} from "./actions";
import { REQUEST_STATUSES } from "../constants";

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
    case UPDATE_USER__SUCCEEDED: {
      const { user } = action.payload;

      return {
        ...state,
        usersById: {
          ...state.usersById,
          [user.id]: user,
        },
      };
    }
    case CREATE_USER__SUCCEEDED: {
      const { user } = action.payload;

      return {
        userIds: [user.id, ...state.userIds],
        usersById: {
          ...state.usersById,
          [user.id]: user,
        },
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
  RESET: /__RESET$/,
};

function getRequestActionType(actionType, regExp) {
  return `${actionType.substring(0, actionType.match(regExp).index)}__REQUEST`;
}

function requests(state = {}, action) {
  if (action.type.match(REQUEST_REGEXPS.START)) {
    return {
      ...state,
      [action.type]: {
        status: REQUEST_STATUSES.PENDING,
      },
    };
  }

  if (action.type.match(REQUEST_REGEXPS.SUCCESS)) {
    return {
      ...state,
      [getRequestActionType(action.type, REQUEST_REGEXPS.SUCCESS)]: {
        status: REQUEST_STATUSES.SUCCESS,
      },
    };
  }

  if (action.type.match(REQUEST_REGEXPS.FAILURE)) {
    return {
      ...state,
      [getRequestActionType(action.type, REQUEST_REGEXPS.FAILURE)]: {
        status: REQUEST_STATUSES.FAILURE,
        error: action.payload.error,
      },
    };
  }

  if (action.type.match(REQUEST_REGEXPS.RESET)) {
    return {
      ...state,
      [getRequestActionType(action.type, REQUEST_REGEXPS.RESET)]: {
        status: null,
        error: null,
      },
    };
  }

  return state;
}

export default combineReducers({
  users,
  requests,
});
