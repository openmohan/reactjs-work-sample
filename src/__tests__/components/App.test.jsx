import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import ConnectedApp, { App } from "../../App";

describe("test headers component", () => {
  it("should render header properly", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("div").length).toEqual(1);
    const divWrap = wrapper.find("div").first();
    expect(divWrap.find("BrowserRouter").length).toEqual(1);
    expect(wrapper.find("Route").length).toEqual(4);
    expect(wrapper.find("Header").length).toEqual(1);
    expect(App.defaultProps.addCourses).toBeDefined();
    expect(App.defaultProps.loadCourses).toBeDefined();
    expect(App.defaultProps.addUsers).toBeDefined();
    expect(App.defaultProps.loadUsers).toBeDefined();
    expect(App.defaultProps.courses).toBeDefined();
    expect(App.defaultProps.users).toBeDefined();
  });

  it("should invoke store actions", () => {
    const middleware = [thunk];
    const store = configureMockStore(middleware);
    const dispatchFake = jest.fn();
    const mystore = store({
      course: { courses: [{ name: "physics", id: 1 }] },
      user: { users: [] },
      registration: { registrations: [] },
      dispatch: dispatchFake
    });
    mystore.dispatch = dispatchFake;
    const wrapper = shallow(<ConnectedApp store={mystore} />);

    expect(wrapper.props().children.props.courses).toEqual([
      { name: "physics", id: 1 }
    ]);
    wrapper.props().children.props.loadCourses();
    wrapper.props().children.props.addCourses({});

    expect(dispatchFake.mock.calls.length).toEqual(2);
  });

  it("should invoke store actions", () => {
    const middleware = [thunk];
    const store = configureMockStore(middleware);
    const dispatchFake = jest.fn();
    const mystore = store({
      course: { courses: [{ name: "physics", id: 1 }] },
      user: { users: [] },
      registration: { registrations: [] },
      dispatch: dispatchFake
    });
    mystore.dispatch = dispatchFake;
    const wrapper = shallow(<ConnectedApp store={mystore} />);

    expect(wrapper.props().children.props.courses).toEqual([
      { name: "physics", id: 1 }
    ]);

    wrapper.props().children.props.addUsers({});
    wrapper.props().children.props.loadUsers({});

    expect(dispatchFake.mock.calls.length).toEqual(2);
  });

  it("should invoke store actions, registrations", () => {
    const middleware = [thunk];
    const store = configureMockStore(middleware);
    const dispatchFake = jest.fn();
    const mystore = store({
      course: { courses: [] },
      user: { users: [] },
      registration: {
        registrations: [
          { course_id: "test", userId: "testt", is_faculty: false }
        ]
      },
      dispatch: dispatchFake
    });
    mystore.dispatch = dispatchFake;
    const wrapper = shallow(<ConnectedApp store={mystore} />);

    expect(wrapper.props().children.props.registrations).toEqual([
      { course_id: "test", userId: "testt", is_faculty: false }
    ]);

    wrapper.props().children.props.addRegistrations({});
    wrapper.props().children.props.loadRegistrations({});

    expect(dispatchFake.mock.calls.length).toEqual(2);
  });
});
