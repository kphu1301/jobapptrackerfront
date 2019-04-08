import React from "react";
import axios from "axios";
import JobAppList from "./JobAppList";
import { SERVER_URL } from "../constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isAuthenticated: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.login();
  };

  login = async () => {
    try {
      const response = await axios.post(SERVER_URL + "/login", {
        username: this.state.username,
        password: this.state.password
      });

      const jwt = response.headers.authorization;

      sessionStorage.setItem("jwt", jwt);
      this.setState({ isAuthenticated: true });

      const userId = this.parseJwtForId(jwt);
      this.setState({ userId: userId });
    } catch (error) {
      toast.error("Invalid Username/Password", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER
      });
      console.error(error);
    }
  };

  logout = event => {
    event.preventDefault();
    sessionStorage.removeItem("jwt");
    this.setState({ isAuthenticated: false });
  };

  parseJwtForId = token => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64)).sub;
  };

  render() {
    if (this.state.isAuthenticated === true) {
      if (this.state.userId !== undefined) {
        return (
          <div>
            <div className="ui horizontal list">
              <div className="item right aligned">
                <button onClick={this.logout}>Logout</button>
              </div>
            </div>
            <JobAppList userId={this.state.userId} />)
          </div>
        );
      } else {
        return <div>Loading...</div>;
      }
    } else {
      return (
        <div>
          <h1 className="ui header center aligned">Login</h1>
          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="field">
              <label>
                Username:{" "}
                <input
                  name="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.handleChange}
                  placeholder="username"
                />
              </label>
            </div>
            <div className="field">
              <label>
                Password:{" "}
                <input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="password"
                />
              </label>
            </div>
            <button className="ui button" type="submit">
              Submit
            </button>
          </form>
        </div>
      );
    }
  }
}

export default Login;
