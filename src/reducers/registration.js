import {
  GET_REGISTRATIONS,
  REGISTRATION_LOADING_STARTED,
  REGISTRATION_LOADING_ENDED,
  ERROR_INJECT
} from "../actions/actionTypes";

export default function registration(
  state = { registrations: [], loading: false, errors: [] },
  action
) {
  switch (action.type) {
    case GET_REGISTRATIONS:
      return { ...state, registrations: action.data };
    case REGISTRATION_LOADING_STARTED:
      return { ...state, loading: true };
    case REGISTRATION_LOADING_ENDED:
      return { ...state, loading: false };
    case ERROR_INJECT:
      return { ...state, errors: [...state.errors, action.data] };
    default:
      return state;
  }
}
