import { Component } from "react";
import auth from "../services/authService";
class Logout extends Component {
  componentDidMount() {
    auth.logout();
    this.props.history.push("/login");
  }
  render() {
    return null;
  }
}

export default Logout;
