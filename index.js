import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";

// redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./src/reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

// Amplify
import config from "./src/aws-exports"; // this needs to be created or added by you, see README
import Amplify from "aws-amplify";
Amplify.configure(config);

import AppSyncConfig from "./appsync-config";

// App
const AnimalApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent("AnimalApp", () => AnimalApp);
