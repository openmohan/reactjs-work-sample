/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "" };
  }

  componentDidMount() {
    this.props.loadUsers();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addUsers(this.state);
    this.setState({ name: "", email: "" });
  };

  render() {
    return (
      <div className="resourceContainer">
        <div className="LeftPane">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <br />
            <label htmlFor="email">EMail: </label>
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={e => {
                this.handleChange(e);
              }}
            />

            <br />
            <input type="submit" value="Add User!" />
          </form>
        </div>
        <div className="RightPane">
          <table className="resourceTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {this.props.users &&
                this.props.users.map(user => {
                  return (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
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

Users.propTypes = {
  addUsers: PropTypes.func,
  loadUsers: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.object)
};

Users.defaultProps = {
  addUsers: () => {},
  loadUsers: () => {},
  users: []
};
