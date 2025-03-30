import React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";

const AppbarComponent = ({
  title,
  navigation,
  showBackButton = false,
  onLogout,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) => {
  return (
    <Appbar.Header>
      {showBackButton && (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      )}
      <Appbar.Content title={title} />
      {onAddTask && <Appbar.Action icon="plus" onPress={onAddTask} />}
      {onLogout && <Appbar.Action icon="logout" onPress={onLogout} />}
      {onEditTask && <Appbar.Action icon="pencil" onPress={onEditTask} />}
      {onDeleteTask && <Appbar.Action icon="delete" onPress={onDeleteTask} />}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFF", // Customize the background color
  },
});

export default AppbarComponent;
