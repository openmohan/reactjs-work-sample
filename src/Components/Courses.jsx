/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import "../styles/styles.css";

export default class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  componentDidMount() {
    this.props.loadCourses();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addCourses(this.state);
    this.setState({ name: "" });
  };

  render() {
    return (
      <div className="resourceContainer">
        <div className="LeftPane">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="courseName">Course Name: </label>
            <input
              name="name"
              type="text"
              id="courseName"
              label="Course Name: "
              value={this.state.name}
              onChange={e => {
                this.handleChange(e);
              }}
            />

            <br />
            <input type="submit" value="Add Course!" />
          </form>
        </div>
        <div className="RightPane">
          <table className="resourceTable">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
              </tr>
            </thead>
            <tbody>
              {this.props.courses &&
                this.props.courses.map(course => {
                  return (
                    <tr key={course.id}>
                      <td>{course.id}</td>
                      <td>{course.name}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Courses.propTypes = {
  addCourses: PropTypes.func,
  loadCourses: PropTypes.func,
  courses: PropTypes.arrayOf(PropTypes.object)
};

Courses.defaultProps = {
  addCourses: () => {},
  loadCourses: () => {},
  courses: []
};
