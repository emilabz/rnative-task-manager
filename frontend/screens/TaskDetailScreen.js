// frontend/screens/TaskDetailScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import api from "../utils/api";
import AppbarComponent from "../components/AppbarComponent";

const TaskDetailScreen = ({ navigation, route }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error(
          "Error fetching task:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleEditTask = () => {
    navigation.navigate("EditTask", { taskId: taskId }); // Navigate to EditTaskScreen
  };

  const handleDeleteTask = async () => {
    try {
      await api.delete(`/tasks/${taskId}`);
      navigation.navigate("Home", { refreshTasks: true }); // Refresh Home
    } catch (error) {
      console.error(
        "Error deleting task:",
        error.response ? error.response.data : error.message
      );
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Task not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppbarComponent
        title="Task Detail"
        navigation={navigation}
        showBackButton={true}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    paddingTop: 20,
    paddingLeft: 20,
  },
  description: {
    fontSize: 16,
    paddingLeft: 20,
  },
});

export default TaskDetailScreen;
