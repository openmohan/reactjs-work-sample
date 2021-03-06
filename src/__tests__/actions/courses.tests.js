import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { addCourses, loadCourses } from "../../actions/courses";
import {
  COURSE_LOADING_STARTED,
  COURSE_LOADING_ENDED,
  GET_COURSES,
  ERROR_INJECT
} from "../../actions/actionTypes";

function findAction(store, type) {
  return store.getActions().find(action => action.type === type);
}

function getActions(store, type) {
  const action = findAction(store, type);
  if (action) return Promise.resolve(action);

  return new Promise(resolve => {
    store.subscribe(() => {
      const actionk = findAction(store, type);
      if (actionk) resolve(actionk);
    });
  });
}

describe("test courses actions", () => {
  fetchMock.restore();
  it("test loadCourses", async () => {
    fetchMock.mock("*", {
      body: [
        {
          name: "physics",
          id: 1
        }
      ],
      status: 200
    });
    const store = configureMockStore([thunk]);
    const mystore = store();
    mystore.dispatch(loadCourses());
    expect(await getActions(mystore, COURSE_LOADING_STARTED)).toEqual({
      type: COURSE_LOADING_STARTED
    });
    expect(await getActions(mystore, GET_COURSES)).toEqual({
      type: GET_COURSES,
      data: [
        {
          name: "physics",
          id: 1
        }
      ]
    });
    expect(await getActions(mystore, COURSE_LOADING_ENDED)).toEqual({
      type: COURSE_LOADING_ENDED
    });
  });
  it("should add courses", async () => {
    fetchMock.restore();
    fetchMock.post("*", {
      status: 201
    });
    fetchMock.get("*", {
      body: [
        {
          name: "physics",
          id: 1
        }
      ],
      status: 200
    });
    const store = configureMockStore([thunk]);
    const mystore = store();
    const course = { name: "physics", id: 1 };
    mystore.dispatch(addCourses(course));
    expect(await getActions(mystore, GET_COURSES)).toEqual({
      type: GET_COURSES,
      data: [
        {
          name: "physics",
          id: 1
        }
      ]
    });

    expect(await getActions(mystore, COURSE_LOADING_ENDED)).toEqual({
      type: COURSE_LOADING_ENDED
    });

    expect(await getActions(mystore, COURSE_LOADING_ENDED)).toEqual({
      type: COURSE_LOADING_ENDED
    });
  });

  it("should add courses", async () => {
    fetchMock.restore();
    fetchMock.post("*", {
      throws: 400
    });
    fetchMock.get("*", {
      body: [
        {
          name: "physics",
          id: 1
        }
      ],
      status: 400
    });
    const store = configureMockStore([thunk]);
    const mystore = store();
    const course = { name: "physics", id: 1 };
    mystore.dispatch(addCourses(course));

    expect(await getActions(mystore, ERROR_INJECT)).toEqual({
      data: 400,
      type: ERROR_INJECT
    });
  });
  it("should add courses", async () => {
    fetchMock.restore();
    fetchMock.post("*", {
      data: 400
    });
    fetchMock.get("*", {
      body: [
        {
          name: "physics",
          id: 1
        }
      ],
      throws: 400
    });
    const store = configureMockStore([thunk]);
    const mystore = store();
    const course = { name: "physics", id: 1 };
    mystore.dispatch(addCourses(course));

    expect(await getActions(mystore, ERROR_INJECT)).toEqual({
      data: 400,
      type: ERROR_INJECT
    });
  });
});
