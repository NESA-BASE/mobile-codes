import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => { 
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userDetails = await AsyncStorage.getItem('firstname');
            setFirstName(userDetails);
        };

        fetchUserDetails();
    }, []);

    return (
        <ImageBackground 
            source={{ uri: 'https://via.placeholder.com/600x800' }} 
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Welcome to the Book Management App</Text>
                <Text style={styles.subtitle}>{firstName}</Text>
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
    subtitle: {
        fontSize: 22,
        color: '#fff',
        textAlign: 'center',
    },
});

export default HomeScreen;
