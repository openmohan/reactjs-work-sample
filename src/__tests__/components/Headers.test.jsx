import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import Header from "../../Components/Header";

describe("test headers component", () => {
  it("should render header properly", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(wrapper.find("Link").length).toEqual(3);
  });
});
