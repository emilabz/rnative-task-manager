// frontend/screens/EditTaskScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import api from "../utils/api";
import AppbarComponent from "../components/AppbarComponent";

const EditTaskScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${taskId}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error(
          "Error fetching task:",
          error.response ? error.response.data : error.message
        );
        Alert.alert("Error", "Failed to fetch task.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSaveTask = async () => {
    if (!title) {
      Alert.alert("Validation Error", "Please enter a task title.");
      return;
    }
    try {
      await api.put(`/tasks/${taskId}`, { title, description });
      // Reset the navigation stack
      navigation.reset({
        index: 0,
        routes: [
          { name: "Home", params: { refreshTasks: true } }, // Navigate to Home and refresh
        ],
      });
    } catch (error) {
      console.error(
        "Error updating task:",
        error.response ? error.response.data : error.message
      );
      Alert.alert("Error", "Failed to update task.");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppbarComponent
        title="Edit Task"
        navigation={navigation}
        showBackButton={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Save" onPress={handleSaveTask} />
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

export default EditTaskScreen;
