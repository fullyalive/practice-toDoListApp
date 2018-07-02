import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");
export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, toDoValue: props.text };
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    uncompleteToDo: PropTypes.func.isRequired,
    completeToDo: PropTypes.func.isRequired,
    updateToDo: PropTypes.func.isRequired
  };

  render() {
    const { isEditing, toDoValue } = this.state;
    const { text, id, deleteToDo, isCompleted } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle
              ]}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}
              value={toDoValue}
              multiline={true}
              onChangeText={this._controlInput}
              returnKeyType={"done"}
              onBlur={this._finishEditing}
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}
            >
              {text}
            </Text>
          )}
        </View>
        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._finishEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>
                  <Ionicons
                    name={"ios-checkmark-circle-outline"}
                    size={25}
                    color={"black"}
                  />
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>
                  <Ionicons name={"ios-hammer"} size={25} color={"black"} />
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={() => deleteToDo(id)}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>
                  <Ionicons
                    name={"ios-close-circle-outline"}
                    size={25}
                    color={"black"}
                  />
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
  _toggleComplete = () => {
    const { isCompleted, uncompleteToDo, completeToDo, id } = this.props;
    if (isCompleted) {
      uncompleted(id);
    } else {
      completeToDo(id);
    }
  };
  _startEditing = () => {
    const { text } = this.props;
    this.setState({
      isEditing: true
    });
  };
  _finishEditing = () => {
    const { toDoValue } = this.state;
    const { id, updateToDo } = this.props;
    updateToDo(id, toDoValue);
    this.setState({
      isEditing: false
    });
  };
  _controlInput = text => {
    this.setState({ toDoValue: text });
  };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20
  },
  input: {
    marginVertical: 15,
    width: width / 2,
    paddingBottom: 5
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "#353535"
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    marginLeft: 5,
    marginRight: 20
  },
  completedCircle: {
    borderColor: "#8b9dc3",
    backgroundColor: "#8b9dc3"
  },
  uncompletedCircle: {
    borderColor: "#8b9dc3"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  }
});
