/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// type Props = {};
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource:[]
     };
   }
  componentDidMount() {
    fetch("http://dummy.restapiexample.com/api/v1/employees")
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error => console.log(error)) //to catch the errors if any
  }

  FlatListItemSeparator = () => {
    return (
      <View style={{
        height: .5,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      />
    );
  }
  renderItem = (data) =>
    <TouchableOpacity style={styles.list}>
      <Text style={styles.lightText}>{data.item.employee_name}</Text>
      <Text style={styles.lightText}>{data.item.employee_salary}</Text>
      <Text style={styles.lightText}>{data.item.employee_age}</Text></TouchableOpacity>


  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  list: {
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#fff"
  }
});
