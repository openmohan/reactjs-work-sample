/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { shallow, mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import Courses from "../../Components/Courses";

describe("Courses component testing", () => {
  it("courses component should render true", () => {
    expect(true).toEqual(true);
  });

  it("courses component should render", () => {
    const props = {
      addCourses: jest.fn(),
      loadCourses: jest.fn(),
      courses: [
        { name: "physics", id: 1 },
        { id: 2, name: "maths" }
      ]
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = shallow(<Courses {...props} />);
    expect(wrapper.find("form").length).toEqual(1);
    expect(wrapper.find("table").length).toEqual(1);
    expect(
      wrapper
        .find("table")
        .at(0)
        .find("td").length
    ).toEqual(4);
    expect(props.loadCourses.mock.calls.length).toEqual(1);
    const formWrapper = wrapper.find("form");
    const formProps = { preventDefault: jest.fn() };
    formWrapper.simulate("submit", formProps);
    expect(formProps.preventDefault.mock.calls.length).toEqual(1);
    expect(props.addCourses.mock.calls.length).toEqual(1);
    expect(props.addCourses.mock.calls[0]).toEqual([{ name: "" }]);
  });

  it("courses component should render and handle change", () => {
    const props = {
      addCourses: jest.fn(),
      loadCourses: jest.fn(),
      courses: [
        { name: "physics", id: 1 },
        { id: 2, name: "maths" }
      ]
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = mount(
      <BrowserRouter>
        <Courses {...props} />
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

    expect(props.loadCourses.mock.calls.length).toEqual(1);
    const formWrapper = wrapper.find("form");
    const formProps = { preventDefault: jest.fn() };
    formWrapper.simulate("submit", formProps);
    expect(formProps.preventDefault.mock.calls.length).toEqual(1);
    expect(props.addCourses.mock.calls.length).toEqual(1);
    expect(props.addCourses.mock.calls[0]).toEqual([{ name: "" }]);

    let inputTypeWrapper = formWrapper.find("input[type='text']");
    // inputTypeWrapper.first().value = "physics";
    wrapper.update();
    inputTypeWrapper = formWrapper.find("input[type='text']");

    inputTypeWrapper.first().simulate("change", {
      target: { value: "physics", name: "name" }
    });
    wrapper.update();
    expect(
      wrapper
        .find("input[type='text']")
        .first()
        .instance().value
    ).toEqual("physics");
    formWrapper.simulate("submit", formProps);
    expect(props.addCourses.mock.calls[1]).toEqual([{ name: "physics" }]);
  });
});
