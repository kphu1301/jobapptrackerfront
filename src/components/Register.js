import React from "react";
import { SERVER_URL } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";

toast.configure();

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      toLogin: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.register();
  };

  register = async () => {
    try {
      const path = "/register";
      const user = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      };

      await axios.post(SERVER_URL + path, JSON.stringify(user), {
        headers: {
          "Content-Type": "application/json"
        }
      });

      toast.success("Successfully registered!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
        onClose: () => this.setState({ toLogin: true })
      });

      this.setState({ toLogin: true });
    } catch (error) {
      toast.error("Unable to Register. Please try again", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      });
      console.error(error);
    }
  };

  render() {
    if (this.state.toLogin === false) {
      return (
        <div>
          <h1 className="ui header center aligned">Register</h1>
          <form className="ui form">
            <div className="field">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                placeholder="foo@bar.com"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                placeholder="username"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={this.handleChange}
              />
            </div>
            <button
              className="ui button"
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default Register;
