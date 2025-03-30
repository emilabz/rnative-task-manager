// frontend/screens/AddTaskScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import api from "../utils/api";
import AppbarComponent from "../components/AppbarComponent";

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = async () => {
    if (!title) {
      Alert.alert("Validation Error", "Please enter a task title.");
      return; // Stop further execution
    }

    try {
      await api.post("/tasks", { title, description });
      navigation.navigate("Home", { refreshTasks: true });
    } catch (error) {
      console.error(
        "Error adding task:",
        error.response ? error.response.data : error.message
      );
      Alert.alert("Error", "Failed to add task.");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the default header
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <AppbarComponent
        title="Add Task"
        navigation={navigation}
        showBackButton
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AddTaskScreen;
