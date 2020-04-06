/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { shallow, mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import Registrations from "../../Components/Registrations";

describe("Registrations component testing", () => {
  it("registrations component should render true", () => {
    expect(true).toEqual(true);
  });

  it("registrations component should render", () => {
    const props = {
      addRegistrations: jest.fn(),
      loadRegistrations: jest.fn(),
      registrations: [
        { course_id: "physics", user_id: "1", is_faculty: false },
        { course_id: "physics", user_id: "1", is_faculty: false }
      ]
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = shallow(<Registrations {...props} />);
    expect(wrapper.find("form").length).toEqual(1);
    expect(wrapper.find("table").length).toEqual(1);
    expect(
      wrapper
        .find("table")
        .at(0)
        .find("td").length
    ).toEqual(6);
    expect(props.loadRegistrations.mock.calls.length).toEqual(1);
    const formWrapper = wrapper.find("form");
    const formProps = { preventDefault: jest.fn() };
    formWrapper.simulate("submit", formProps);
    expect(formProps.preventDefault.mock.calls.length).toEqual(1);
    expect(props.addRegistrations.mock.calls.length).toEqual(1);
    expect(props.addRegistrations.mock.calls[0]).toEqual([
      { course_id: "", user_id: "", is_faculty: false }
    ]);
  });

  it("registrations component should render and handle change", () => {
    const props = {
      addRegistrations: jest.fn(),
      loadRegistrations: jest.fn(),
      courses: [
        { id: "1", name: "maths" },
        { id: "2", name: "physics" }
      ],
      users: [
        { name: "mohan", id: 1, email: "test@test.com" },
        { id: 2, name: "arun", email: "test@test.com" }
      ],
      registrations: [
        { course_id: "physics", user_id: "1", is_faculty: false },
        { course_id: "maths", user_id: "2", is_faculty: false }
      ]
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = mount(
      <BrowserRouter>
        <Registrations {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find("form").length).toEqual(1);
    expect(wrapper.find("table").length).toEqual(1);
    expect(
      wrapper
        .find("table")
        .at(0)
        .find("td").length
    ).toEqual(6);

    expect(props.loadRegistrations.mock.calls.length).toEqual(1);
    const formWrapper = wrapper.find("form");
    const formProps = { preventDefault: jest.fn() };
    formWrapper.simulate("submit", formProps);
    expect(formProps.preventDefault.mock.calls.length).toEqual(1);
    expect(props.addRegistrations.mock.calls.length).toEqual(1);
    expect(props.addRegistrations.mock.calls[0]).toEqual([
      { course_id: "", user_id: "", is_faculty: false }
    ]);

    const userSelectWrapper = formWrapper.find("select").at(0);

    wrapper.update();
    userSelectWrapper.simulate("change", {
      target: {
        value: 1,
        name: "user_id",
        options: { "2": { id: "arun" } },
        selectedIndex: 2
      }
    });

    const courseSelectWrapper = formWrapper.find("select").at(1);

    wrapper.update();
    courseSelectWrapper.simulate("change", {
      target: {
        value: 1,
        name: "course_id",
        options: { "2": { id: "physics" } },
        selectedIndex: 2
      }
    });
    wrapper.update();

    const facultyWrapper = formWrapper.find("input").at(0);
    facultyWrapper.simulate("change", {
      target: {
        name: "is_faculty",
        checked: true
      }
    });
    wrapper.update();

    formWrapper.simulate("submit", formProps);

    expect(props.addRegistrations.mock.calls.length).toEqual(2);
    expect(props.addRegistrations.mock.calls[1]).toEqual([
      { course_id: "physics", user_id: "arun", is_faculty: true }
    ]);
  });
});
