import React from "react";
import { Image, StyleSheet } from "react-native";
import { TabNavigator } from "react-navigation";

import { colors, fonts } from "../theme";
import SignIn from "./sign-in";
import SignUp from "./sign-up";

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
});

const routes = {
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In"
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up"
    }
  }
};

const routeConfig = {
  tabBarPosition: "bottom",
  tabBarOptions: {
    showLabel: true,
    activeTintColor: colors.primary,
    inactiveTintColor: colors.secondary,
    indicatorStyle: { backgroundColor: colors.secondary },
    labelStyle: {
      fontFamily: fonts.base,
      fontSize: 12
    },
    style: {
      backgroundColor: "white",
      borderTopWidth: 0,
      paddingBottom: 3
    }
  }
};

export default TabNavigator(routes, routeConfig);
