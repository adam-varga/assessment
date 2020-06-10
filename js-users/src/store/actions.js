// ACTION TYPES

export const GET_USERS__REQUEST = "GET_USERS__REQUEST";
export const GET_USERS__SUCCEEDED = "GET_USERS__SUCCEEDED";
export const GET_USERS__FAILED = "GET_USERS__FAILED";
export const GET_USERS__RESET = "GET_USERS__RESET";

export const CREATE_USER__REQUEST = "CREATE_USER__REQUEST";
export const CREATE_USER__SUCCEEDED = "CREATE_USER__SUCCEEDED";
export const CREATE_USER__FAILED = "CREATE_USER__FAILED";
export const CREATE_USER__RESET = "CREATE_USER__RESET";


export const UPDATE_USER__REQUEST = "UPDATE_USER__REQUEST";
export const UPDATE_USER__SUCCEEDED = "UPDATE_USER__SUCCEEDED";
export const UPDATE_USER__FAILED = "UPDATE_USER__FAILED";
export const UPDATE_USER__RESET = "UPDATE_USER__RESET";


// ACTION CREATORS

export function createAction(type, payload) {
  return {
    type,
    payload,
  };
}
