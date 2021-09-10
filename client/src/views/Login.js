import React, { Component } from "react";
import "../assets/css/Login.css";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Link,
  withRouter,
} from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (
      (this.state.email == "1234" || this.state.email == "1234") &&
      this.state.password == "summer2021"
    ) {
      console.log("h");
      this.props.history.push("faculty/dashboard");
    }
    if (
      (this.state.email == "2022053" || this.state.email == "2022053") &&
      this.state.password == "summer2021"
    ) {
      console.log("h");
      this.props.history.push("student/dashboard");
    }
    if (
      (this.state.email == "5813" || this.state.email == "5813") &&
      this.state.password == "summer2021"
    ) {
 
      this.props.history.push("departmentHead/dashboard");
    }
    if (
      (this.state.email == "2134" || this.state.email == "2134") &&
      this.state.password == "summer2021"
    ) {
      this.props.history.push("dean/dashboard");
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="form-modal">
        <div className="form-toggle">
          <div>
            <img
              style={{
                width: "170px",
                height: "150px",
                justifyContent: "center",
              }}
              src={require("assets/img/logo.png").default}
              alt="..."
            />
          </div>
          <h4>
            <b>USMS</b>
          </h4>
        </div>

        <div id="login-form">
          <form noValidate onSubmit={this.onSubmit}>
            <input
              onChange={this.onChange}
              value={this.state.email}
              placeholder="Enter usename"
              id="email"
              type="email"
            />

            <input
              onChange={this.onChange}
              placeholder="Enter password"
              value={this.state.password}
              id="password"
              type="password"
            />

            <button
              type="submit"
              className="btn login"
              onClick={this.handleSubmit}
            >
              login
            </button>

            <p className="create">
              Forgot Password?{" "}
              <button type="button" className="toggle-signup">
                Click here to reset password
              </button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
