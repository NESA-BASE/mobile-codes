import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AuthTextInput from "../components/AuthTextInput";
import Button from "../components/Button";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!firstname || !lastname || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://10.5.223.54:3000/v1/auth/register",
        {
          firstname,
          lastname,
          email,
          password,
        }
      );

      console.log("Registration response:", response.data);
      navigation.navigate("Login");
    } catch (error) {
      if (error.response) {
        //console.error("Error data:", error.response.data);
        //console.error("Error status:", error.response.status);
        //console.error("Error headers:", error.response.headers);
        Alert.alert(
          "Error",
          `Registration failed: ${
            error.response.data.message || "Please try again."
          }`
        );
      } else if (error.request) {
        //console.error("Error request:", error.request);
        Alert.alert("Error", "No response from server. Please try again.");
      } else {
        //console.error("Error message:", error.message);
        Alert.alert("Error", `Registration failed: ${error.message}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <AuthTextInput
        placeholder="First Name"
        value={firstname}
        onChangeText={setFirstname}
      />
      <AuthTextInput
        placeholder="Last Name"
        value={lastname}
        onChangeText={setLastname}
      />
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
      <Button title="Register" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? Log in
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

export default RegisterScreen;
