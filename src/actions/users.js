import {
  USER_LOADING_ENDED,
  USER_LOADING_STARTED,
  GET_USERS,
  ERROR_INJECT
} from "./actionTypes";

function userLoadingStarted() {
  return {
    type: USER_LOADING_STARTED
  };
}

function userLoad(res) {
  return {
    type: GET_USERS,
    data: res
  };
}

function userLoadingSuccessful() {
  return {
    type: USER_LOADING_ENDED
  };
}

function userLoadingErr(err) {
  return {
    type: ERROR_INJECT,
    data: err
  };
}

export function loadUsers() {
  return async dispatch => {
    dispatch(userLoadingStarted());
    try {
      const res = await fetch("/users");
      const users = await res.json();
      dispatch(userLoad(users));
    } catch (err) {
      dispatch(userLoadingErr(err));
    }

    dispatch(userLoadingSuccessful());
  };
}

export function addUsers(user) {
  return async dispatch => {
    try {
      await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(user)
      });
      dispatch(loadUsers());
      dispatch(userLoadingSuccessful());
      return;
    } catch (err) {
      dispatch(userLoadingErr(err));
    }
  };
}
