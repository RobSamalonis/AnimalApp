import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from "react-native";

import Amplify, { Auth } from "aws-amplify";
import config from "../aws-exports";
Amplify.configure(config);

export default class AnimalApp extends Component {
  state = {
    authCode: "",
    user: {}
  };

  onChangeUsernameText(username) {
    this.setState({ username });
  }
  onChangePasswordText(password) {
    this.setState({ password });
  }

  signIn() {
    Auth.signIn(this.state.username, this.state.password)
      .then(user => {
        this.setState({ user });
      })
      .catch(err => {
        alert("error signing in: " + JSON.stringify(err));
      });
  }

  confirmSignIn() {
    Auth.confirmSignIn(user, authCode)
      .then(user => {
        alert("user: " + JSON.stringify(user));
      })
      .catch(err => {
        alert("error confirming sign in: " + JSON.stringify(err));
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          placeholder="Username"
          onChangeText={value => this.onChangeUsernameText(value)}
          style={styles.input}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={value => this.onChangePasswordText(value)}
          style={styles.input}
        />
        <Button title="Sign In" onPress={this.signIn.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: "#ededed",
    marginVertical: 10
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  }
});
