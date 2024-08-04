import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import DashboardItem from "../../../components/DashboardItem";
import axios from "axios";

const index = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getDashboardData = async () => {
    try {
      const result = await axios.get("/admin/dashboard");
      console.log(result.data);
      setDashboardData(result.data);
      setLoading(false);
    } catch (error) {
      console.error("ERROR: " + error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const onRefresh = () => {
    setRefreshing(true);
    getDashboardData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users data</Text>
      <FlatList
        data={dashboardData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <DashboardItem
            username={item.username}
            totalTasks={item.totalTasks}
            doneTasks={item.doneTasks}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
