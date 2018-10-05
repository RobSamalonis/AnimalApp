import React from "react";
import { StatusBar } from "react-native";

import { Provider, connect } from "react-redux";
import { Auth } from "aws-amplify";

import AuthNav from "./src/views/auth-nav";
import LoggedInNav from "./src/views/logged-in-nav";

import Amplify from 'aws-amplify';
import aws_exports from './src/aws-exports';

Amplify.configure(aws_exports);


class App extends React.Component {
  state = {
    user: {},
    isLoading: true
  };

  async componentDidMount() {
    StatusBar.setHidden(true);
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.setState({ user, isLoading: false });
    } catch (err) {
      this.setState({ isLoading: false });
    }
  }
  async componentWillReceiveProps(nextProps) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.setState({ user });
    } catch (err) {
      this.setState({ user: {} });
    }
  }
  render() {
    if (this.state.isLoading) return null;
    let loggedIn = false;
    if (this.state.user.username) {
      loggedIn = true;
    }
    if (loggedIn) {
      return <LoggedInNav />;
    }
    return <AuthNav />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);
