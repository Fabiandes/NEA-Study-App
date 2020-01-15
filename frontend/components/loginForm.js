import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default class LoginForm extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <View style={styles.form}>
                <TouchableOpacity style={styles.fbButton}>

                </TouchableOpacity>
                <TouchableOpacity style={styles.fbButton}>
            
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    form:{

    }
})