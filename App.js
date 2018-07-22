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
import config from "./src/aws-exports";
Amplify.configure(config);

export default class AnimalApp extends Component {
  state = {
    authCode: "",
    user: {}
  };

  onChangeText(authCode) {
    this.setState({ authCode });
  }
  onChangeUsernameText(username) {
    this.setState({ username });
  }
  onChangePasswordText(password) {
    this.setState({ password });
  }
  onChangePhoneText(phone_number) {
    this.setState({ phone_number });
  }
  onChangeEmailText(email) {
    this.setState({ email });
  }
  signUp() {
    Auth.signUp({
      username: this.state.username,
      password: this.state.password,
      attributes: {
        phone_number: this.state.phone_number,
        email: this.state.email
      }
    })
      .then(res => {
        alert("successful signup: ", res);
      })
      .catch(err => {
        alert("error signing up: " + JSON.stringify(err));
      });
  }
  confirmUser() {
    const { authCode } = this.state;
    const { username } = this.state;
    Auth.confirmSignUp(username, authCode)
      .then(res => {
        alert("successful confirmation: " + JSON.stringify(res));
      })
      .catch(err => {
        alert("error confirming user: " + JSON.stringify(err));
      });
  }

  signIn() {
    Auth.signIn(username, password)
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
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={value => this.onChangeEmailText(value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Phone"
          onChangeText={value => this.onChangePhoneText(value)}
          style={styles.input}
        />
        <Button title="Sign Up" onPress={this.signUp.bind(this)} />
        <TextInput
          placeholder="Input Code"
          onChangeText={value => this.onChangeText(value)}
          style={styles.input}
        />
        <Button title="Confirm User" onPress={this.confirmUser.bind(this)} />
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
