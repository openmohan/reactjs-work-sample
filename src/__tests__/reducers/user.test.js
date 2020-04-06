import userReducer from "../../reducers/user";
import {
  GET_USERS,
  USER_LOADING_STARTED,
  USER_LOADING_ENDED,
  ERROR_INJECT
} from "../../actions/actionTypes";

describe("test user reducers", () => {
  const defaultCourseState = { users: [], loading: false, errors: [] };

  it("test user reducers", () => {
    expect(userReducer(undefined, {})).toEqual({
      users: [],
      errors: [],
      loading: false
    });
  });
  it("test user reducers", () => {
    expect(userReducer(defaultCourseState, {})).toEqual({
      users: [],
      errors: [],
      loading: false
    });
  });

  it("test user reducers", () => {
    expect(
      userReducer(defaultCourseState, {
        type: GET_USERS,
        data: [{ name: "physics", id: 1 }]
      })
    ).toEqual({
      users: [{ name: "physics", id: 1 }],
      errors: [],
      loading: false
    });
  });

  it("test user reducers-get users", () => {
    expect(
      userReducer(defaultCourseState, {
        type: GET_USERS,
        data: [{ name: "mohan", id: 1, email: "test" }]
      })
    ).toEqual({
      users: [{ name: "mohan", id: 1, email: "test" }],
      errors: [],
      loading: false
    });
  });
  it("test user reducers-loading started", () => {
    expect(
      userReducer(defaultCourseState, {
        type: USER_LOADING_STARTED
      })
    ).toEqual({
      users: [],
      errors: [],
      loading: true
    });
  });
  it("test user reducers-loading ended", () => {
    expect(
      userReducer(defaultCourseState, {
        type: USER_LOADING_ENDED
      })
    ).toEqual({
      users: [],
      errors: [],
      loading: false
    });
  });
  it("test user reducers-error added", () => {
    expect(
      userReducer(defaultCourseState, {
        type: ERROR_INJECT,
        data: "error dummy"
      })
    ).toEqual({
      users: [],
      errors: ["error dummy"],
      loading: false
    });
  });
});
