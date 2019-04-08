import React from "react";
import { Link } from "react-router-dom";
class Home extends React.Component {
  render() {
    return (
      <div className="ui segment">
        <h1 className="ui header center aligned">
          Welcome to Job Application Tracker
        </h1>
        <h4 className="ui header center aligned">
          Keep Track of All Your Job Applications <br /> <br />
          Please <Link to="/register">Register</Link> or{" "}
          <Link to="/login">Login</Link>{" "}
        </h4>
      </div>
    );
  }
}

export default Home;
