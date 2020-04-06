import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

export default function Header() {
  return (
    <div className="headerComponent">
      <Link to="/courses">
        <span>Go to courses!</span>
      </Link>
      <Link to="/users">
        <span>Go to users!</span>
      </Link>
      <Link to="/registrations">
        <span>Go to registrations!</span>
      </Link>
    </div>
  );
}
