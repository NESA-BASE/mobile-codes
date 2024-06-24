import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      //const accessToken = await AsyncStorage.getItem("accessToken");
      const id = await AsyncStorage.getItem("id");
      try {
        const response = await axios.get(
          `http://jsonplaceholder.typicode.com/users/${id}`
        );
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: "https://avatar.iran.liara.run/public" }} // Placeholder for profile image
          style={styles.profileImage}
        />
        <Text style={styles.title}>{userInfo.username}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.infoLabel}>Name</Text>
        <Text style={styles.infoText}>{userInfo.name}</Text>
        <Text style={styles.infoLabel}>Phone</Text>
        <Text style={styles.infoText}>{userInfo.phone}</Text>
        <Text style={styles.infoLabel}>Email</Text>
        <Text style={styles.infoText}>{userInfo.email}</Text>
        <Text style={styles.infoLabel}>Website</Text>
        <Text style={styles.infoText}>{userInfo.website}</Text>
      </View>
      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={logout} color="#d9534f" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
    justifyContent: "space-between",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  profileInfo: {
    paddingHorizontal: 20,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 18,
    color: "#777",
    marginBottom: 15,
  },
  logoutButton: {
    marginBottom: 30,
    alignItems: "center",
  },
});

export default ProfileScreen;
