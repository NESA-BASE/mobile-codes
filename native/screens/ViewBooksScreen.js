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

const ViewBooksScreen = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      const fetchBooks = async () => {
        setLoading(true); // Ensure loading is set to true each time screen is focused
        try {
          const response = await axios.get("http://10.5.223.54:3000/v1/books");
          setBooks(response.data.books);
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
      <Text style={styles.title}>Available Books</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookContainer}>
            <Text style={styles.bookTitle}>{item.name}</Text>
            <Text>{item.author}</Text>
            <Text>{item.publisher}</Text>
            <Text>{item.publicationYear}</Text>
            <Text>{item.subject}</Text>
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
  },
  bookContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ViewBooksScreen;
