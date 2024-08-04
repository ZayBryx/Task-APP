import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Controller } from "react-hook-form";
import DropdownSelect from "react-native-input-select";

const DropDown = ({
  label,
  name,
  control,
  errors,
  placeholder,
  rules,
  options,
  isMultiple,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DropdownSelect
            label={label}
            placeholder={placeholder}
            options={options}
            selectedValue={value}
            onValueChange={(itemValue) => onChange(itemValue)}
            isMultiple={isMultiple}
            optionLabel="name"
            optionValue="value"
            primaryColor="deepskyblue"
            dropdownErrorStyle={errors[name] && { borderColor: "red" }}
            error={errors[name] && errors[name].message}
          />
        )}
        rules={rules}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  errorText: {
    color: "red",
    marginTop: 4,
    fontSize: 12,
  },
});
