import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
const editTask = () => {
  const { itemId } = useLocalSearchParams();
  return (
    <View>
      <Text>editTask | {itemId}</Text>
    </View>
  );
};

export default editTask;

const styles = StyleSheet.create({});
