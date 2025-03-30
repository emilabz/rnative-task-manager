// frontend/screens/SignupScreen.js
import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useContext(AuthContext);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert(
        "Validation Error",
        "Please enter name, email, and password."
      );
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters long."
      );
      return;
    }

    try {
      await signup(name, email, password);
      Alert.alert(
        "Signup Successful",
        "Your account has been created successfully!"
      );
    } catch (error) {
      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
      Alert.alert(
        "Signup Failed",
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  const handleLoginPress = () => {
    console.log("handleLoginPressed");
    // Reset the navigation stack to the Login screen
    navigation.reset({
      index: 0,
      routes: [
        { name: "Login" }, // Navigate to Login
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <View style={styles.form}>
        <Text style={styles.text}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />
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
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />
        <Button title="Signup" onPress={handleSignup} />
      </View>
      <Text style={styles.link} onPress={handleLoginPress}>
        Already have an account? Login
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

export default SignupScreen;
