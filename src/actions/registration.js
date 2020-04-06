import {
  REGISTRATION_LOADING_ENDED,
  REGISTRATION_LOADING_STARTED,
  GET_REGISTRATIONS,
  ERROR_INJECT
} from "./actionTypes";

function registrationLoadingStarted() {
  return {
    type: REGISTRATION_LOADING_STARTED
  };
}

function registrationLoad(res) {
  return {
    type: GET_REGISTRATIONS,
    data: res
  };
}

function registrationLoadingSuccessful() {
  return {
    type: REGISTRATION_LOADING_ENDED
  };
}

function registrationLoadingErr(err) {
  return {
    type: ERROR_INJECT,
    data: err
  };
}

export function loadRegistrations() {
  return async dispatch => {
    dispatch(registrationLoadingStarted());
    try {
      const res = await fetch("/registrations");
      const registrations = await res.json();
      dispatch(registrationLoad(registrations));
    } catch (err) {
      dispatch(registrationLoadingErr(err));
    }

    dispatch(registrationLoadingSuccessful());
  };
}

export function addRegistrations(registration) {
  return async dispatch => {
    try {
      await fetch("/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(registration)
      });
      dispatch(loadRegistrations());
      dispatch(registrationLoadingSuccessful());
      return;
    } catch (err) {
      dispatch(registrationLoadingErr(err));
    }
  };
}
