// frontend/components/TaskItem.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const TaskItem = ({ task, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(task)}>
      <Text style={styles.title}>{task.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
  },
});

export default TaskItem;
