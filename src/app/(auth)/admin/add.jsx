import { StyleSheet, View, Button } from "react-native";
import { useForm } from "react-hook-form";
import DropDown from "../../../components/DropDown";
import Loading from "../../../components/Loading";
import FormController from "../../../components/FormController";
import React, { useEffect, useState } from "react";
import axios from "axios";

const add = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const result = await axios.get("/admin/user");
      setLoading(false);
      setOptions(result.data);
    };

    getUser();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <Loading />;
  }

  const onSubmit = async (data) => {
    try {
      const result = await axios.post("/admin/task", data);
      console.log(result.data);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  return (
    <View style={styles.container}>
      <DropDown
        label="Select an Option"
        name="createdBy"
        control={control}
        errors={errors}
        options={options}
        rules={{ required: "This field is required" }}
      />

      <FormController
        label="Title"
        name="title"
        control={control}
        errors={errors}
        placeholder="Enter your Title"
        rules={{ required: "Title is required" }}
      />

      <FormController
        label="Description"
        name="description"
        control={control}
        errors={errors}
        placeholder="Enter your description"
        rules={{ required: "Description is required" }}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default add;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});
