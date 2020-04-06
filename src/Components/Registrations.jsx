/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { course_id: "", user_id: "", is_faculty: false };
  }

  componentDidMount() {
    this.props.loadCourses();
    this.props.loadUsers();
    this.props.loadRegistrations();
  }

  handleChange = e => {
    if (e.target.name === "is_faculty") {
      this.setState({ [e.target.name]: e.target.checked });
    } else {
      const sel = e.target;
      const opt = sel.options[sel.selectedIndex];

      this.setState({ [e.target.name]: opt.id });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addRegistrations(this.state);
    this.setState({ course_id: "", user_id: "", is_faculty: false });
  };

  render() {
    return (
      <div className="resourceContainer">
        <div className="LeftPane">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="users">Users: </label>
            <select name="user_id" onChange={this.handleChange}>
              {this.props.users &&
                this.props.users.map(user => {
                  return (
                    <option key={user.id} value={user.name} id={user.id}>
                      {user.name}
                    </option>
                  );
                })}
            </select>
            <br />
            <label htmlFor="courses">Courses: </label>
            <select name="course_id" onChange={this.handleChange}>
              {this.props.courses &&
                this.props.courses.map(course => {
                  return (
                    <option key={course.id} value={course.name} id={course.id}>
                      {course.name}
                    </option>
                  );
                })}
            </select>
            <br />
            <label htmlFor="is_faculty">Is Faculty: </label>
            <input
              name="is_faculty"
              checked={this.state.is_faculty}
              type="checkbox"
              onChange={this.handleChange}
            />
            <br />
            <input type="submit" value="Add registration!" />
          </form>
        </div>
        <div className="RightPane">
          <table className="resourceTable">
            <thead>
              <tr>
                <th>Course</th>
                <th>User</th>
                <th>Is Faculty</th>
              </tr>
            </thead>
            <tbody>
              {this.props.registrations &&
                this.props.registrations.map(registration => {
                  return (
                    <tr key={registration.id}>
                      <td>{registration.course_id}</td>
                      <td>{registration.user_id}</td>
                      <td>{registration.is_faculty ? "yes" : "no"}</td>
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

Registration.propTypes = {
  addRegistrations: PropTypes.func,
  loadRegistrations: PropTypes.func,
  registrations: PropTypes.arrayOf(PropTypes.object),
  courses: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
  loadCourses: PropTypes.func,
  loadUsers: PropTypes.func
};

Registration.defaultProps = {
  addRegistrations: () => {},
  loadRegistrations: () => {},
  loadCourses: () => {},
  loadUsers: () => {},
  registrations: [],
  courses: [],
  users: []
};
