import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PostScreen from '../screens/PostScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    // <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
      <Stack.Screen
        name="JSON API"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Post" component={PostScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
