import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TaskItem from "../../../components/TaskItem";
import Loading from "../../../components/Loading";

const TaskList = () => {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    try {
      const tasks = await axios.get("/task");
      setTaskList(tasks.data);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleToggle = async (id) => {
    const updatedTasks = taskList.map((task) =>
      task._id === id ? { ...task, status: !task.status } : task
    );
    setTaskList(updatedTasks);

    try {
      await axios.patch(`/task/${id}`, {
        status: !taskList.find((task) => task._id === id).status,
      });
    } catch (error) {
      setError(error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadTasks();
  };

  const renderItem = ({ item }) => (
    <TaskItem
      title={item.title}
      description={item.description}
      status={item.status}
      onToggle={() => handleToggle(item._id)}
    />
  );

  if (loading && !refreshing) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={taskList}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default TaskList;
