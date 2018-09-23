import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicator
} from "react-native";
import LottieView from "lottie-react-native";
import { colors, fonts } from "../theme";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.fetchMore = this._fetchMore.bind(this);
    this.fetchData = this._fetchData.bind(this);
    this.state = {
      dataSource: null,
      isLoading: true,
      isLoadingMore: false,
      _data: null,
      _dataAfter: ""
    };
  }

  _fetchData(callback) {
    const params =
      this.state._dataAfter !== "" ? `&after=${this.state._dataAfter}` : "";
    //Limits fetches to 15 so there's lesser items from the get go
    fetch(`https://www.reddit.com/subreddits/popular/.json?limit=15${params}`)
      .then(response => response.json())
      .then(callback)
      .catch(error => {
        console.error(error);
      });
  }

  _fetchMore() {
    this.fetchData(responseJson => {
      const data = this.state._data.concat(responseJson.data.children);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        isLoadingMore: false,
        _data: data,
        _dataAfter: responseJson.data.after
      });
    });
  }

  componentDidMount() {
    //Start getting the first batch of data from reddit
    this.fetchData(responseJson => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      const data = responseJson.data.children;
      this.setState({
        dataSource: ds.cloneWithRows(data),
        isLoading: false,
        _data: data,
        _dataAfter: responseJson.data.after
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.dataSource && (
          <ListView
            removeClippedSubviews={false}
            dataSource={this.state.dataSource}
            renderRow={rowData => {
              return (
                <View style={styles.listItem}>
                  {console.log("why")}
                  <View style={styles.imageWrapper}>
                    <Image
                      style={{ width: 70, height: 70 }}
                      source={{
                        uri:
                          rowData.data.icon_img === "" ||
                          rowData.data.icon_img === null
                            ? "https://via.placeholder.com/70x70.jpg"
                            : rowData.data.icon_img
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>
                      {rowData.data.display_name}
                    </Text>
                    <Text style={styles.subtitle}>
                      {rowData.data.public_description}
                    </Text>
                  </View>
                </View>
              );
            }}
            onEndReached={() =>
              this.setState({ isLoadingMore: true }, () => this.fetchMore())
            }
            renderFooter={() => {
              return (
                this.state.isLoadingMore && (
                  <View style={{ flex: 1, padding: 10 }}>
                    <ActivityIndicator size="small" />
                  </View>
                )
              );
            }}
          />
        )}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d6d7da",
    padding: 6
  },
  imageWrapper: {
    padding: 5
  },
  title: {
    fontSize: 20,
    textAlign: "left",
    margin: 6
  },
  subtitle: {
    fontSize: 10,
    textAlign: "left",
    margin: 6
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
