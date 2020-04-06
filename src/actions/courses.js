import {
  GET_COURSES,
  COURSE_LOADING_STARTED,
  COURSE_LOADING_ENDED,
  ERROR_INJECT
} from "./actionTypes";

function courseLoadingStarted() {
  return {
    type: COURSE_LOADING_STARTED
  };
}

function courseLoad(res) {
  return {
    type: GET_COURSES,
    data: res
  };
}

function courseLoadingSuccessful() {
  return {
    type: COURSE_LOADING_ENDED
  };
}

function courseLoadingErr(err) {
  return {
    type: ERROR_INJECT,
    data: err
  };
}

export function loadCourses() {
  return async dispatch => {
    dispatch(courseLoadingStarted());
    try {
      const res = await fetch("/courses");
      const courses = await res.json();
      dispatch(courseLoad(courses));
    } catch (err) {
      dispatch(courseLoadingErr(err));
    }

    dispatch(courseLoadingSuccessful());
  };
}

export function addCourses(course) {
  return async dispatch => {
    try {
      await fetch("/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(course)
      });
      dispatch(loadCourses());
      dispatch(courseLoadingSuccessful());
      return;
    } catch (err) {
      dispatch(courseLoadingErr(err));
    }
  };
}
