import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DashboardItem = ({ username, doneTasks, totalTasks }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.username}>Username: {username}</Text>
      <Text style={styles.tasks}>
        Total Tasks: {doneTasks}/{totalTasks}
      </Text>
    </View>
  );
};

export default DashboardItem;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tasks: {
    fontSize: 14,
    color: "#777",
  },
});
