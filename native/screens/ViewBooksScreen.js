import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import colors from "../colors";
const ViewBooksScreen = ({ navigation, route }) => {
  const newPost = route.params?.newPost;
  const [books, setBooks] = useState([newPost]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      const fetchBooks = async () => {
        setLoading(true); // Ensure loading is set to true each time screen is focused
        try {
          const response = await axios.get(
            `http://jsonplaceholder.typicode.com/posts?_limit=10`
          );
          setBooks(response.data);
          setError(""); // Reset error state in case of successful fetch
        } catch (error) {
          console.error("Failed to fetch books:", error);
          setError("Failed to load books. Please try again later."); // Set error message
        } finally {
          setLoading(false);
        }
      };

      fetchBooks();

      return () => {}; // Optional cleanup function
    }, [])
  );


  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Posts</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookContainer}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.subject}>{item.body}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Post", { id: item.id })}
              style={styles.chatButton}
            >
              <Entypo name="chat" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  bookContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "capitalize",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    marginVertical: 20,
    flex: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
  },
});

export default ViewBooksScreen;
