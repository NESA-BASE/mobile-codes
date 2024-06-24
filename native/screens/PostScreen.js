// implement the post screen with axios, good design to show the posts and its respective comments

// display post using the GET API /posts/1 and its comments using the GET API /posts/1/comments
// Provide a delete specific post DELETE /posts/1
// the url: https://jsonplaceholder.typicode.com

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../colors";

const PostScreen = ({ route, navigation }) => {
    const id = route.params.id;
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    useEffect(() => {
        const fetchPost = async () => {
        setLoading(true);
        try {
            const postResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${id}`
            );
            setPost(postResponse.data);
            setError("");
        } catch (error) {
            console.error("Failed to fetch post:", error);
            setError("Failed to load post. Please try again later.");
        }
        };
    
        const fetchComments = async () => {
        setLoading(true);
        try {
            const commentsResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${id}/comments`
            );
            setComments(commentsResponse.data);
            setError("");
        } catch (error) {
            console.error("Failed to fetch comments:", error);
            setError("Failed to load comments. Please try again later.");
        } finally {
            setLoading(false);
        }
        };
    
        fetchPost();
        fetchComments();
    }, []);
    
    const handleDeletePost = async () => {
        try {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        // reload the posts after deleting the post
        navigation.navigate("View Books", { id: id });
        Alert.alert("Post deleted successfully.");
        setPost({});
        setComments([]);
        } catch (error) {
        console.error("Failed to delete post:", error);
        setError("Failed to delete post. Please try again later.");
        }
    };
    
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
        {/* <Text style={styles.title}>Post {post.id}</Text> */}
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postBody}>{post.body}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePost}>
            <Text style={styles.deleteButtonText}>Delete Post</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Comments</Text>
        <FlatList
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View style={styles.commentContainer}>
                <Text style={styles.commentName}>{item.name}</Text>
                <Text style={styles.commentEmail}>{item.email}</Text>
                <Text style={styles.commentBody}>{item.body}</Text>
            </View>
            )}
        />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  postBody: {
    fontSize: 16,
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: colors.primary,
    height: 50,
    marginVertical: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,

    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
  },
  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  commentContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "gray",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  commentName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    fontStyle: "italic",
  },
  commentEmail: {
    fontSize: 16,
    marginBottom: 4,
    color: "darkgray",
  },
  commentBody: {
    fontSize: 14,
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

export default PostScreen;