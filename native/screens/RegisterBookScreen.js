import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Alert,
  Image,
  StatusBar,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthTextInput from "../components/AuthTextInput";
import Button from "../components/Button";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
const backImage = require("../assets/backImage.png");

const RegisterBookScreen = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    if (!body || !title) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const userId = await AsyncStorage.getItem("id");
    console.log("User ID:", userId);

    try {
      const res = await axios.get(
        `http://jsonplaceholder.typicode.com/posts?title=${title}`
      );

      // return an alert if the post already exists
      if (res.data.length > 0) {
        Alert.alert("Error", "Post already exists. Please try another title.");
        return;
      }

      const response = await axios.post(
        "http://jsonplaceholder.typicode.com/posts",
        {
          title,
          body,
          userId,
        }
      );

      setTitle("");
      setBody("");
      // Assuming your backend returns a success message or posts details
      console.log("Post registration response:", response.data);
      Alert.alert("Success", "Post registered successfully!");

      // Optionally, navigate to view all posts or any other screen after registration
      navigation.navigate("View Books", { newPost: response.data });
    } catch (error) {
      console.error("Post Registration Error:", error);
      Alert.alert("Error", "Post registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles2.container}>
      <Image source={backImage} style={styles2.backImage} />
      <View style={styles2.whiteSheet} />
      <SafeAreaView style={styles2.form}>
        <Text style={styles2.title}>Register a Post</Text>
        <AuthTextInput
          placeholder={"Title"}
          value={title}
          onChangeText={setTitle}
        />
        <AuthTextInput
          placeholder={"Body"}
          value={body}
          height={100}
          multiline={true}
          maxLength={200}
          onChangeText={setBody}
        />
        <TouchableOpacity
          aria-disabled={loading}
          style={styles2.button}
          onPress={handleRegisterBook}
        >
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            {" "}
            Save post
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </KeyboardAwareScrollView>
  );
};

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
    backgroundColor: "#F9F7FB",
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

export default RegisterBookScreen;
