import React, { useEffect } from "react";
import { View, Button, StyleSheet, Alert, Linking } from "react-native";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import FormController from "../components/FormController";
import { router } from "expo-router";

const Login = () => {
  const { login } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("password", "P!ssw0rd");
  }, []);

  const handleLogin = async (data) => {
    const result = await login(data);
    if (result.error) {
      Alert.alert(result.error.msg);
      return;
    }

    router.replace(`(auth)/${result.data.user.role}`);
  };

  return (
    <View style={styles.container}>
      <FormController
        label="Username"
        name="username"
        control={control}
        errors={errors}
        placeholder="Enter your username"
        rules={{ required: "Username is required" }}
      />
      <FormController
        label="Password"
        name="password"
        control={control}
        errors={errors}
        placeholder="Enter your password"
        secureEntryText={true}
        rules={{ required: "Password is required" }}
      />
      <Button title="Login" onPress={handleSubmit(handleLogin)} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
});
