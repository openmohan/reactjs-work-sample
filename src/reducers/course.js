import {
  GET_COURSES,
  COURSE_LOADING_STARTED,
  COURSE_LOADING_ENDED,
  ERROR_INJECT
} from "../actions/actionTypes";

export default function course(
  state = { courses: [], loading: false, errors: [] },
  action
) {
  switch (action.type) {
    case GET_COURSES:
      return { ...state, courses: action.data };
    case COURSE_LOADING_STARTED:
      return { ...state, loading: true };
    case COURSE_LOADING_ENDED:
      return { ...state, loading: false };
    case ERROR_INJECT:
      return { ...state, errors: [...state.errors, action.data] };
    default:
      return state;
  }
}
