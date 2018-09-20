import React from "react";
import { Image, StyleSheet } from "react-native";
import { TabNavigator } from "react-navigation";

import { colors, fonts } from "../theme";
import Home from "./Home";
import Profile from "./Profile";
import Pets from "./Pets";

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
});

const routes = {
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home"
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: "Profile"
    }
  },
  Pets: {
    screen: Pets,
    navigationOptions: {
      title: 'Pets'
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
