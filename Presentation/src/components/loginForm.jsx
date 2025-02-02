import React from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import axios from "axios";
import Joi from "joi-browser";
import Form from "./form";
import Input from "./input";
import auth, { getCurrentUser } from "../services/authService";
import LoginFormNavbar from "./loginFormNavbar";
import "./css/loginform.css";

const options = [
  { value: "teacher", label: "Teacher" },
  { value: "admin", label: "Admin" },
  { value: "student", label: "Student" },
  { value: "obecell", label: "OBE Cell" },
];
class LoginForm extends Form {
  state = {
    selectedOption: null,
    data: { userName: "", password: "", selectedOption: null },
    errors: {},
  };

  schema = {
    userName: Joi.string().required().label("username"),
    password: Joi.string().required().label("Password"),
    selectedOption: Joi.required(),
  };

  componentDidMount() {
    const setProps = this.props;
    async function submit(props) {
      let currentUser = localStorage.getItem("token");
      function setJwt(currentUser) {
        axios.defaults.headers.common["X-Access-Token"] = currentUser;
        console.log("reqeust send");
      }
      try {
        if (currentUser) {
          setJwt(currentUser);
          const headerResponse = await auth.login({});
          console.log(headerResponse.data);
          if (Object.keys(headerResponse.data.token).length == 0) {
            toast.error("First Log in ");
            this.props.history.push("/login");
          } else {
            if (headerResponse.data.user === "teacher") {
              setProps.history.push("/courses");
              toast.error("You have already logged in");
              localStorage.removeItem("token");
              console.log("Previous Token Removed");
              localStorage.setItem("token", headerResponse.data.token);
              console.log("New Token Added in memory");
              console.log(headerResponse);
            } else if (headerResponse.data.user === "obecell") {
              setProps.history.push("/obe-cell");
              toast.error("You have already logged in");
              localStorage.removeItem("token");
              console.log("Previous Token Removed");
              localStorage.setItem("token", headerResponse.data.token);
              console.log("New Token Added in memory");
              console.log(headerResponse);
            } else if (headerResponse.data.user === "admin") {
              setProps.history.push("/admin");
              toast.error("You have already logged in");
              localStorage.removeItem("token");
              console.log("Previous Token Removed");
              localStorage.setItem("token", headerResponse.data.token);
              console.log("New Token Added in memory");
              console.log(headerResponse);
            }
          }
        }
      } catch (ex) {
        if (ex.response && ex.response.status === 401) {
          localStorage.removeItem("token");
          window.location = "/login";
          toast.error("Unauthorized please log in again");
        }
      }
    }
    submit();
  }

  doSubmit = async () => {
    try {
      const { data, selectedOption } = this.state;
      const jwt = await auth.login(
        data.userName,
        data.password,
        selectedOption.value
      );
      if (Object.keys(jwt.data).length == 0)
        toast.error("Invalid username or password");
      else {
        if (selectedOption.value === "teacher") {
          localStorage.setItem("token", jwt.data.token);
          this.props.history.push("/courses");
        }
        if (selectedOption.value === "obecell") {
          localStorage.setItem("token", jwt.data.token);
          this.props.history.push("/obe-cell");
        }
        if (selectedOption.value === "admin") {
          localStorage.setItem("token", jwt.data.token);
          this.props.history.push("/admin");
        }
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.userName = ex.response.data;
        this.setState({ errors });
        console.log(errors);
      }
    }
  };

  handleOnChange = (selectedOption) => {
    this.setState({ selectedOption });
  };
  render() {
    const { data, errors, selectedOption } = this.state;
    return (
      <>
        <div className="login_form_background">
          <LoginFormNavbar />
          <div className="center">
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="txt_field">
                <Input
                  name="userName"
                  value={data.userName}
                  label="Username"
                  placeholder="Enter Username"
                  type="text"
                  onChange={this.handleChange}
                  error={errors.userName}
                />
                <Input
                  name="password"
                  value={data.password}
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                  onChange={this.handleChange}
                  error={errors.password}
                />
                <br></br>
                <Select
                  className="change-font"
                  value={selectedOption}
                  onChange={this.handleOnChange}
                  options={options}
                  placeholder="Login As"
                />
              </div>
              <button disabled={this.validate()} className="custome_button">
                Login
              </button>
              <div className="pass">Forgot Password?</div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default LoginForm;
