/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { shallow, mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import Users from "../../Components/Users";

describe("Users component testing", () => {
  it("users component should render true", () => {
    expect(true).toEqual(true);
  });

  it("users component should render", () => {
    const props = {
      addUsers: jest.fn(),
      loadUsers: jest.fn(),
      users: [
        { name: "physics", id: 1, email: "test@test.com" },
        { id: 2, name: "maths", email: "test@test.com" }
      ]
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = shallow(<Users {...props} />);
    expect(wrapper.find("form").length).toEqual(1);
    expect(wrapper.find("table").length).toEqual(1);
    expect(
      wrapper
        .find("table")
        .at(0)
        .find("td").length
    ).toEqual(4);
    expect(props.loadUsers.mock.calls.length).toEqual(1);
    const formWrapper = wrapper.find("form");
    const formProps = { preventDefault: jest.fn() };
    formWrapper.simulate("submit", formProps);
    expect(formProps.preventDefault.mock.calls.length).toEqual(1);
    expect(props.addUsers.mock.calls.length).toEqual(1);
    expect(props.addUsers.mock.calls[0]).toEqual([{ name: "", email: "" }]);
  });

  it("users component should render and handle change", () => {
    const props = {
      addUsers: jest.fn(),
      loadUsers: jest.fn(),
      users: [
        { name: "mohan", id: 1, email: "test@test.com" },
        { id: 2, name: "prasath", email: "test@test.com" }
      ]
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = mount(
      <BrowserRouter>
        <Users {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find("form").length).toEqual(1);
    expect(wrapper.find("table").length).toEqual(1);
    expect(
      wrapper
        .find("table")
        .at(0)
        .find("td").length
    ).toEqual(4);

    expect(props.loadUsers.mock.calls.length).toEqual(1);
    const formWrapper = wrapper.find("form");
    const formProps = { preventDefault: jest.fn() };
    formWrapper.simulate("submit", formProps);
    expect(formProps.preventDefault.mock.calls.length).toEqual(1);
    expect(props.addUsers.mock.calls.length).toEqual(1);
    expect(props.addUsers.mock.calls[0]).toEqual([{ name: "", email: "" }]);

    let inputTypeWrapper = formWrapper.find("input[type='text']");
    // inputTypeWrapper.first().value = "physics";
    wrapper.update();
    inputTypeWrapper = formWrapper.find("input[type='text']");

    inputTypeWrapper.first().simulate("change", {
      target: { value: "physics", name: "name" }
    });
    inputTypeWrapper.at(1).simulate("change", {
      target: { value: "test@test.com", name: "email" }
    });
    wrapper.update();
    expect(
      wrapper
        .find("input[type='text']")
        .first()
        .instance().value
    ).toEqual("physics");
    expect(
      wrapper
        .find("input[type='text']")
        .at(1)
        .instance().value
    ).toEqual("test@test.com");
    formWrapper.simulate("submit", formProps);
    expect(props.addUsers.mock.calls[1]).toEqual([
      { name: "physics", email: "test@test.com" }
    ]);
  });
});
