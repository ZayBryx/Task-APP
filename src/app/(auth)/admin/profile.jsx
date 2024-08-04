import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { router } from "expo-router";
import Loading from "../../../components/Loading";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { logout } = useAuth();

  const getUserData = async () => {
    try {
      const result = await axios.get(`/user`);
      setUser(result.data.user);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getUserData();
  };

  if (loading && !refreshing) {
    return <Loading />;
  }

  async function handleLogout() {
    await logout();
    router.replace("/");
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.card}>
        <Text style={styles.title}>Profile Information</Text>
        <View style={styles.userInfo}>
          <FontAwesome name="user" size={50} color="#517fa4" />
          <View style={styles.textContainer}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.value}>{user.username}</Text>
          </View>
        </View>
        <View style={styles.userInfo}>
          <FontAwesome name="id-card" size={50} color="#517fa4" />
          <View style={styles.textContainer}>
            <Text style={styles.label}>User ID:</Text>
            <Text style={styles.value}>{user.userId}</Text>
          </View>
        </View>
        <View style={styles.userInfo}>
          <FontAwesome name="briefcase" size={50} color="#517fa4" />
          <View style={styles.textContainer}>
            <Text style={styles.label}>Role:</Text>
            <Text style={styles.value}>{user.role}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  textContainer: {
    marginLeft: 15,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff3b30",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});
