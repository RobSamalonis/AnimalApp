import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Animated,
  Dimensions,
  Alert
} from "react-native";

import { connect } from "react-redux";
import { Auth } from "aws-amplify";

import { logOut } from "../actions";
import { colors, fonts } from "../theme";
const { width, height } = Dimensions.get("window");

import { withAuthenticator } from 'aws-amplify-react-native'
import { API, graphqlOperation } from 'aws-amplify'



const listQuery = `
query list {
  listPets {
    items {
      id
      name
    }
  }
}
`

class Pets extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    pets: [],
    text: "Data NOT Gathered"
  };

  AnimatedScale = new Animated.Value(1);

  logout() {
    Auth.signOut()
      .then(() => {
        this.props.dispatchLogout();
      })
      .catch(err => {
        console.log("err: ", err);
      });
  }

  navigate() {
    this.props.navigation.navigate("Route1");
  }
  
  animate() {
    Animated.timing(this.AnimatedScale, {
      toValue: 0.8,
      duration: 1250,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(this.AnimatedScale, {
        toValue: 1,
        duration: 1250,
        useNativeDriver: true
      }).start(() => this.animate());
    });
  }
  async componentDidMount() {
    const pets = await API.graphql(graphqlOperation(listQuery))
    console.log(pets.data.listPets.items);
    // this.setState({ pets: pets.data.listPets.items });
    this.state({ pets: pets.data.listPets.items })
    this.state({ text: "Data Gathered" })
    Alert.alert("Alert", JSON.stringify(pets));
    this.animate();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.homeContainer}>
          <Text style={styles.welcome}>{JSON.stringify(this.state.pets)}</Text>
          <Text style={styles.welcome}>{this.state.text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  homeContainer: {
    alignItems: "center"
  },
  welcome: {
    fontFamily: fonts.light,
    color: "rgba(0, 0, 0, .85)",
    marginBottom: 26,
    fontSize: 22,
    textAlign: "center"
  },
  registration: {
    fontFamily: fonts.base,
    color: "rgba(0, 0, 0, .5)",
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  dispatchLogout: () => logOut()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pets);
