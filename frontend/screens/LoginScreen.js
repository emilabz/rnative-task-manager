// frontend/screens/LoginScreen.js
import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }
    // Email format validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    try {
      const errorMessage = await login(email, password);
      if (errorMessage) {
        // If there was an error, display the Alert
        Alert.alert("Login Failed", errorMessage);
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <Text style={styles.text}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />
        <Text style={styles.text}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
      <Text style={styles.link} onPress={() => navigation.navigate("Signup")}>
        Don't have an account? Signup
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  form: {
    width: "80%",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    alignContent: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    marginBottom: 5,
    marginStart: 10,
  },
  link: {
    marginTop: 15,
    color: "blue",
  },
});

export default LoginScreen;
