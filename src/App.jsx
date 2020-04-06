import React from "react";
import "./App.css";
import "./styles/styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Courses from "./Components/Courses";
import Users from "./Components/Users";
import Header from "./Components/Header";
import { loadUsers, addUsers } from "./actions/users";
import { loadCourses, addCourses } from "./actions/courses";
import { addRegistrations, loadRegistrations } from "./actions/registration";
import Registration from "./Components/Registrations";

export const App = props => {
  return (
    <div className="App flex-container">
      <Router>
        <Route path="/">
          <Header />
        </Route>
        <Route exact path="/courses">
          <Courses
            courses={props.courses}
            addCourses={props.addCourses}
            loadCourses={props.loadCourses}
          />
        </Route>
        <Route exact path="/users">
          <Users
            users={props.users}
            addUsers={props.addUsers}
            loadUsers={props.loadUsers}
          />
        </Route>
        <Route exact path="/registrations">
          <Registration
            courses={props.courses}
            users={props.users}
            registrations={props.registrations}
            addRegistrations={props.addRegistrations}
            loadRegistrations={props.loadRegistrations}
            loadCourses={props.loadCourses}
            loadUsers={props.loadUsers}
          />
        </Route>
      </Router>
    </div>
  );
};

App.propTypes = {
  addCourses: PropTypes.func,
  loadCourses: PropTypes.func,
  courses: PropTypes.arrayOf(PropTypes.object),
  addUsers: PropTypes.func,
  loadUsers: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.object),
  addRegistrations: PropTypes.func,
  loadRegistrations: PropTypes.func,
  registrations: PropTypes.arrayOf(PropTypes.object)
};

App.defaultProps = {
  addCourses: () => {},
  loadCourses: () => {},
  courses: [],
  addUsers: () => {},
  loadUsers: () => {},
  users: [],
  addRegistrations: () => {},
  loadRegistrations: () => {},
  registrations: []
};

function mapPropsToState(state) {
  return {
    users: state.user.users,
    courses: state.course.courses,
    registrations: state.registration.registrations
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    loadUsers: () => {
      dispatch(loadUsers());
    },
    addUsers: user => {
      dispatch(addUsers(user));
    },
    loadCourses: () => {
      dispatch(loadCourses());
    },
    addCourses: course => {
      dispatch(addCourses(course));
    },
    loadRegistrations: () => {
      dispatch(loadRegistrations());
    },
    addRegistrations: registration => {
      dispatch(addRegistrations(registration));
    }
  };
}

export default connect(mapPropsToState, mapDispatchToProps)(App);
