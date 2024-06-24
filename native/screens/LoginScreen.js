import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import AuthTextInput from "../components/AuthTextInput";
import Button from "../components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
const backImage = require("../assets/backImage.png");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !username) {
      Alert.alert("Error", "Please enter both email and username.");
      return;
    }

    try {
      const response = await axios.get(
        `http://jsonplaceholder.typicode.com/users?email=${email}&username=${username}`
      );

      console.log("Login response:", response.data[0]);
      const { name, id } = response.data[0];
      const identity = JSON.stringify(id);

      // Store the access token in the local storage
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("id", identity);
      navigation.navigate("JSON API");
    } catch (error) {
      if (error.response) {
        //console.error("Error data:", error.response.data);
        //console.error("Error status:", error.response.status);
        //console.error("Error headers:", error.response.headers);
        Alert.alert(
          "Error",
          `Login failed: ${
            "Invalid email or username. Please try again."
          }`
        );
      } else if (error.request) {
        //console.error("Error request:", error.request);
        Alert.alert("Error", "No response from server. Please try again.");
      } else {
        //console.error("Error message:", error.message);
        Alert.alert(
          "Error",
          `Login failed: Invalid email or username. Please try again.`
        );
      }
    } finally {
      setLoading(false);
    }
    setEmail("");
    setUsername("");
  };

  return (
    <View style={styles2.container}>
      <Image source={backImage} style={styles2.backImage} />
      <View style={styles2.whiteSheet} />
      <SafeAreaView style={styles2.form}>
        <Text style={styles2.title}>Login</Text>
        <AuthTextInput
          placeholder="Username"
          value={username}
          height={58}
          onChangeText={setUsername}
        />
        <AuthTextInput
          placeholder="Email"
          value={email}
          height={58}
          onChangeText={setEmail}
        />
        {/* <Button title="Login" onPress={handleLogin} /> */}
        <TouchableOpacity
          aria-disabled={loading}
          style={styles2.button}
          onPress={handleLogin}
        >
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            {" "}
            Login
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      {/* <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
        Don't have an account? Register
      </Text> */}
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

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginTop: 200,
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "#f57c00",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

export default LoginScreen;
