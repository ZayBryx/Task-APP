import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";

const FormController = ({
  label,
  secureEntryText,
  name,
  control,
  errors,
  placeholder,
  rules,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors[name] && styles.inputError]}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            secureTextEntry={secureEntryText}
            onChangeText={onChange}
          />
        )}
        rules={rules}
      />
      {errors[name] && (
        <Text style={styles.errorText}>{errors[name].message}</Text>
      )}
    </View>
  );
};

export default FormController;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 4,
    fontSize: 12,
  },
});
