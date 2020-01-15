import React, { Component } from 'react';
import { View, Icon, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class RegisterForm extends Component {

    handleClick = () =>{
    }

    render(){
        return(
            <TouchableOpacity style={StyleSheet.button} onPress={this.handleClick}>
                <Icon/>
                <Text>SIGN IN WITH FACEBOOK</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        flexDirection:"row",
    }
})