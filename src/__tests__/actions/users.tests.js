import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { addUsers, loadUsers } from "../../actions/users";
import {
  USER_LOADING_STARTED,
  USER_LOADING_ENDED,
  GET_USERS,
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

describe("test users actions", () => {
  fetchMock.restore();
  it("test loadUsers", async () => {
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
    mystore.dispatch(loadUsers());
    expect(await getActions(mystore, USER_LOADING_STARTED)).toEqual({
      type: USER_LOADING_STARTED
    });
    expect(await getActions(mystore, GET_USERS)).toEqual({
      type: GET_USERS,
      data: [
        {
          name: "physics",
          id: 1
        }
      ]
    });
    expect(await getActions(mystore, USER_LOADING_ENDED)).toEqual({
      type: USER_LOADING_ENDED
    });
  });
  it("should add users", async () => {
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
    const user = { name: "physics", id: 1 };
    mystore.dispatch(addUsers(user));
    expect(await getActions(mystore, GET_USERS)).toEqual({
      type: GET_USERS,
      data: [
        {
          name: "physics",
          id: 1
        }
      ]
    });

    expect(await getActions(mystore, USER_LOADING_ENDED)).toEqual({
      type: USER_LOADING_ENDED
    });

    expect(await getActions(mystore, USER_LOADING_ENDED)).toEqual({
      type: USER_LOADING_ENDED
    });
  });

  it("should add users", async () => {
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
    const user = { name: "physics", id: 1 };
    mystore.dispatch(addUsers(user));

    expect(await getActions(mystore, ERROR_INJECT)).toEqual({
      data: 400,
      type: ERROR_INJECT
    });
  });
  it("should add users", async () => {
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
    const user = { name: "physics", id: 1 };
    mystore.dispatch(addUsers(user));

    expect(await getActions(mystore, ERROR_INJECT)).toEqual({
      data: 400,
      type: ERROR_INJECT
    });
  });
});
