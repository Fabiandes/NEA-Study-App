import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import RegisterForm from '../registerForm'

export default function RegisterPage() {
  return (
    <RegisterForm/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input:{
    backgroundColor: '#fff',
  }
});