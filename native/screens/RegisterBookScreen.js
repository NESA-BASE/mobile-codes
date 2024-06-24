import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Keyboard, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthTextInput from "../components/AuthTextInput";
import Button from "../components/Button";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const RegisterBookScreen = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [subject, setSubject] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: !isKeyboardVisible,
    });
  }, [isKeyboardVisible, navigation]);

  const handleRegisterBook = async () => {
    if (!name || !author || !publisher || !publicationYear || !subject) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const yearRegex = /^\d{4}$/;
    if (!yearRegex.test(publicationYear)) {
      Alert.alert("Error", "Please enter a valid publication year (4 digits).");
      return;
    }

    try {
      const response = await axios.post("http://10.5.223.54:3000/v1/books", {
        name,
        author,
        publisher,
        publicationYear: parseInt(publicationYear),
        subject,
      });

      setName("");
      setAuthor("");
      setPublicationYear("");
      setPublisher("");
      setSubject("");
      // Assuming your backend returns a success message or book details
      console.log("Book registration response:", response.data);

      // Optionally, navigate to view all books or any other screen after registration
      navigation.navigate("View Books");
    } catch (error) {
      console.error("Book Registration Error:", error);
      Alert.alert("Error", "Book registration failed. Please try again.");
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register a Book</Text>
      <AuthTextInput placeholder="Name" value={name} onChangeText={setName} />
      <AuthTextInput
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />
      <AuthTextInput
        placeholder="Publisher"
        value={publisher}
        onChangeText={setPublisher}
      />
      <AuthTextInput
        placeholder="Publication Year"
        value={publicationYear}
        onChangeText={setPublicationYear}
      />
      <AuthTextInput
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
      />
      <Button title="Register Book" onPress={handleRegisterBook} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default RegisterBookScreen;
