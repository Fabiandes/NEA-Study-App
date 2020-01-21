import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import RegisterForm from './components/registerForm';
import LoginForm from './components/loginForm';

export default class App extends Component {
  render() {
    return (
      <RegisterForm/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
