import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const AuthTextInput = ({ placeholder, secureTextEntry, value, onChangeText, multiline, maxLength, height }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, { height: height || 58 }]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline ? true : false}
        maxLength={maxLength}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#E3E3E3",
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
});

export default AuthTextInput;
