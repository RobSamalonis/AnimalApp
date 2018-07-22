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
  signUp() {
    Auth.signUp({
      username: "admin",
      password: "Admin123!",
      attributes: {
        phone_number: "+12677721647",
        email: "samalonis@yahoo.com"
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
    Auth.confirmSignUp("admin", authCode)
      .then(res => {
        alert("successful confirmation: ", res);
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
        alert("error signing in: ", err);
      });
  }
  confirmSignIn() {
    Auth.confirmSignIn(user, authCode)
      .then(user => {
        alert("user: ", user);
      })
      .catch(err => {
        alert("error confirming sign in: ", err);
      });
  }
  render() {
    return (
      <View style={styles.container}>
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
