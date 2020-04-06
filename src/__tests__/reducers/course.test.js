import couseReducer from "../../reducers/course";
import {
  GET_COURSES,
  COURSE_LOADING_STARTED,
  COURSE_LOADING_ENDED,
  ERROR_INJECT
} from "../../actions/actionTypes";

describe("test course reducers", () => {
  const defaultCourseState = { courses: [], loading: false, errors: [] };
  it("test course reducers", () => {
    expect(couseReducer(undefined, {})).toEqual({
      courses: [],
      errors: [],
      loading: false
    });
  });

  it("test course reducers", () => {
    expect(couseReducer(defaultCourseState, {})).toEqual({
      courses: [],
      errors: [],
      loading: false
    });
  });

  it("test course reducers", () => {
    expect(
      couseReducer(defaultCourseState, {
        type: GET_COURSES,
        data: [{ name: "physics", id: 1 }]
      })
    ).toEqual({
      courses: [{ name: "physics", id: 1 }],
      errors: [],
      loading: false
    });
  });

  it("test course reducers-get courses", () => {
    expect(
      couseReducer(defaultCourseState, {
        type: GET_COURSES,
        data: [{ name: "physics", id: 1 }]
      })
    ).toEqual({
      courses: [{ name: "physics", id: 1 }],
      errors: [],
      loading: false
    });
  });
  it("test course reducers-loading started", () => {
    expect(
      couseReducer(defaultCourseState, {
        type: COURSE_LOADING_STARTED
      })
    ).toEqual({
      courses: [],
      errors: [],
      loading: true
    });
  });
  it("test course reducers-loading ended", () => {
    expect(
      couseReducer(defaultCourseState, {
        type: COURSE_LOADING_ENDED
      })
    ).toEqual({
      courses: [],
      errors: [],
      loading: false
    });
  });
  it("test course reducers-error added", () => {
    expect(
      couseReducer(defaultCourseState, {
        type: ERROR_INJECT,
        data: "error dummy"
      })
    ).toEqual({
      courses: [],
      errors: ["error dummy"],
      loading: false
    });
  });
});
