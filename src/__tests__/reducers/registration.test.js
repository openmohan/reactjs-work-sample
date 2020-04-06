import registrationReducer from "../../reducers/registration";
import {
  GET_REGISTRATIONS,
  REGISTRATION_LOADING_STARTED,
  REGISTRATION_LOADING_ENDED,
  ERROR_INJECT
} from "../../actions/actionTypes";

describe("test registration reducers", () => {
  const defaultRegistrationState = {
    registrations: [{ course_id: "physics", user_id: "mohan", id: 1 }],
    loading: false,
    errors: []
  };

  it("test registration reducers", () => {
    expect(registrationReducer(undefined, {})).toEqual({
      registrations: [],
      errors: [],
      loading: false
    });
  });
  it("test registration reducers", () => {
    expect(registrationReducer(defaultRegistrationState, {})).toEqual({
      registrations: [{ course_id: "physics", user_id: "mohan", id: 1 }],
      errors: [],
      loading: false
    });
  });

  it("test registration reducers", () => {
    expect(
      registrationReducer(defaultRegistrationState, {
        type: GET_REGISTRATIONS,
        data: [{ course_id: "physics", user_id: "mohan", id: 1 }]
      })
    ).toEqual({
      registrations: [{ course_id: "physics", user_id: "mohan", id: 1 }],
      errors: [],
      loading: false
    });
  });

  it("test registration reducers-get registrations", () => {
    expect(
      registrationReducer(defaultRegistrationState, {
        type: GET_REGISTRATIONS,
        data: [{ name: "mohan", id: 1, email: "test" }]
      })
    ).toEqual({
      registrations: [{ name: "mohan", id: 1, email: "test" }],
      errors: [],
      loading: false
    });
  });
  it("test registration reducers-loading started", () => {
    expect(
      registrationReducer(defaultRegistrationState, {
        type: REGISTRATION_LOADING_STARTED
      })
    ).toEqual({
      registrations: [{ course_id: "physics", user_id: "mohan", id: 1 }],
      errors: [],
      loading: true
    });
  });
  it("test registration reducers-loading ended", () => {
    expect(
      registrationReducer(defaultRegistrationState, {
        type: REGISTRATION_LOADING_ENDED
      })
    ).toEqual({
      registrations: [{ course_id: "physics", user_id: "mohan", id: 1 }],
      errors: [],
      loading: false
    });
  });
  it("test registration reducers-error added", () => {
    expect(
      registrationReducer(defaultRegistrationState, {
        type: ERROR_INJECT,
        data: "error dummy"
      })
    ).toEqual({
      registrations: [{ course_id: "physics", user_id: "mohan", id: 1 }],
      errors: ["error dummy"],
      loading: false
    });
  });
});
