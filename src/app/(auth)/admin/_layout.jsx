import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
const AdminLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Create Task",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="create" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="edit/[itemId]"
        options={{
          title: "Edit Task",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="edit" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default AdminLayout;
