import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';

const HomeScreen = () => { 
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userDetails = await AsyncStorage.getItem('name');
            setName(userDetails);
        };

        fetchUserDetails();
    }, []);

    return (
      <ImageBackground
        // source={{ uri: 'https://via.placeholder.com/600x800' }}
        source={require("../assets/home.jpg")}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to Json Placeholder</Text>
          <Text style={styles.subtitle}>{name}</Text>
          {/* ADD INFO TO SHOW WHAT JSON PLACEHOLDER DOES
                    1. Create a new post
                    2. View all posts
                    3. View a specific post and its comments
                    4. Delete a specific post
                    5. View user profile
                    6. Logout
                 */}
          <View style={styles.listContainer}>
            <Text style={styles.stitle}>What you can do:</Text>
            <Text style={styles.list}>1. Create a new post</Text>
            <Text style={styles.list}>2. View all posts</Text>
            <Text style={styles.list}>
              3. View a specific post and its comments
            </Text>
            <Text style={styles.list}>4. Delete a specific post</Text>
            <Text style={styles.list}>5. View user profile</Text>
            <Text style={styles.list}>6. Logout</Text>
          </View>
        </View>
      </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adding an overlay to make text readable
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    stitle: {
        fontSize: 22,
        color: "#fff",
        fontWeight: 'bold',
        padding: 20,
    },
    subtitle: {
        fontSize: 22,
        color: colors.primary,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 30,
    },
    list: {
        width: '100%',
        padding: 5,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
});

export default HomeScreen;
