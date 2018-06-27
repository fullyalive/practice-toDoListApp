import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>To Do List</Text>
        <View style={styles.card}>
          <TextInput style={styles.input} placholder={"New To Do"} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fc913a",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "300"
  }
});
