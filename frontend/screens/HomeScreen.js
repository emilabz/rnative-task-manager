// frontend/screens/HomeScreen.js
import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Button,
} from "react-native";
import TaskItem from "../components/TaskItem";
import AddTaskButton from "../components/AddTaskButton";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import AppbarComponent from "../components/AppbarComponent";

const HomeScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext); // Get logout function from AuthContext

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(
        "Error fetching tasks:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };
  // useFocusEffect to refresh when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // Check if refreshTasks is true, then fetch and reset the param
      if (route.params?.refreshTasks) {
        fetchTasks();
        // Clear the refreshTasks param so it doesn't refresh every time
        navigation.setParams({ refreshTasks: false });
      }
    }, [route.params])
  );
  useEffect(() => {
    fetchTasks();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTasks().finally(() => setRefreshing(false));
  }, []);

  const handleTaskPress = (task) => {
    navigation.navigate("TaskDetail", { taskId: task._id });
  };

  const handleAddTask = () => {
    navigation.navigate("AddTask");
  };

  return (
    <View style={styles.container}>
      <AppbarComponent
        title="All Tasks"
        navigation={navigation}
        onAddTask={handleAddTask}
        onLogout={logout}
      />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks yet. Add one!</Text>
          <AddTaskButton onPress={() => navigation.navigate("AddTask")} />
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TaskItem task={item} onPress={handleTaskPress} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default HomeScreen;
