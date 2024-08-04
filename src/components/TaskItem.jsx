import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const TaskItem = ({ title, description, status, onToggle }) => (
  <View style={styles.taskContainer}>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    <Switch value={status} onValueChange={onToggle} />
  </View>
);

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});

export default TaskItem;
