import React, { Component } from "react";
import {
  Platform,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal
} from "react-native";

import { Auth } from "aws-amplify";
import { connect } from "react-redux";

import { authenticate, confirmUserLogin } from "../actions";
import { fonts, colors } from "../theme";

import Input from "../components/Input";
import Button from "../components/Button";

import LottieView from "lottie-react-native";

class SignIn extends Component {
  state = {
    username: "",
    password: "",
    accessCode: ""
  };

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  signIn() {
    const { username, password } = this.state;
    this.props.dispatchAuthenticate(username, password);
  }

  render() {
    const { fontsLoaded } = this.state;
    const {
      auth: {
        signInErrorMessage,
        isAuthenticating,
        signInError,
        showSignInConfirmationModal
      }
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image
            source={require("../../assets/love.png")}
            style={styles.headingImage}
            resizeMode="contain"
          />
        </View>
        {isAuthenticating && (
          <View style={styles.overlay}>
            <LottieView
              source={require("./loading.json")}
              ref={animation => {
                this.animation = animation;
              }}
              style={{
                width: 200,
                height: 200
              }}
              autoPlay
              loop
            />
          </View>
        )}
        <View style={styles.inputContainer}>
          <Input
            placeholder="User Name"
            type="username"
            onChangeText={this.onChangeText}
            value={this.state.username}
          />
          <Input
            placeholder="Password"
            type="password"
            onChangeText={this.onChangeText}
            value={this.state.password}
            secureTextEntry
          />

          <Button
            isLoading={isAuthenticating}
            title="Sign In"
            onPress={this.signIn.bind(this)}
            style={styles.signInButton}
          />
          <Text
            style={[styles.errorMessage, signInError && { color: "black" }]}
          >
            Error logging in. Please try again.
          </Text>
          <Text
            style={[styles.errorMessage, signInError && { color: "black" }]}
          >
            {signInErrorMessage}
          </Text>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {
  dispatchConfirmUserLogin: authCode => confirmUserLogin(authCode),
  dispatchAuthenticate: (username, password) => authenticate(username, password)
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  headingImage: {
    width: 180,
    height: 180
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: "transparent",
    fontFamily: fonts.base
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 40
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  greeting: {
    fontSize: 24,
    fontFamily: fonts.light
  },
  greeting2: {
    color: "#666",
    fontSize: 24,
    marginTop: 5,
    fontFamily: fonts.light
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.sky,
    opacity: 0.5
  }
});
