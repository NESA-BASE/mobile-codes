import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AuthTextInput from "../components/AuthTextInput";
import Button from "../components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://10.5.223.54:3000/v1/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login response:", response.data);
      const {
        access: { token: accessToken },
      } = response.data.tokens;
      const { firstname } = response.data.user;
      const { id } = response.data.user;
      const identity = JSON.stringify(id);

      // Store the access token in the local storage
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("firstname", firstname);
      await AsyncStorage.setItem("id", identity);
      navigation.navigate("Main");
    } catch (error) {
      if (error.response) {
        //console.error("Error data:", error.response.data);
        //console.error("Error status:", error.response.status);
        //console.error("Error headers:", error.response.headers);
        Alert.alert(
          "Error",
          `Login failed: ${
            error.response.data.message ||
            "Invalid email or password. Please try again."
          }`
        );
      } else if (error.request) {
        //console.error("Error request:", error.request);
        Alert.alert("Error", "No response from server. Please try again.");
      } else {
        //console.error("Error message:", error.message);
        Alert.alert("Error", `Login failed: ${error.message}`);
      }
    }
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <AuthTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <AuthTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
        Don't have an account? Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  link: {
    color: "#3498db",
    marginTop: 20,
    textAlign: "center",
  },
});

export default LoginScreen;
