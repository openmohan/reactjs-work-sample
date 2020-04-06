import {
  GET_USERS,
  USER_LOADING_STARTED,
  USER_LOADING_ENDED,
  ERROR_INJECT
} from "../actions/actionTypes";

export default function user(
  state = { users: [], loading: false, errors: [] },
  action
) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.data };
    case USER_LOADING_STARTED:
      return { ...state, loading: true };
    case USER_LOADING_ENDED:
      return { ...state, loading: false };
    case ERROR_INJECT:
      return { ...state, errors: [...state.errors, action.data] };
    default:
      return state;
  }
}
