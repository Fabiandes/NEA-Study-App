import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'

export default class FBButton extends Component {

    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={this.handleClick}>
                <View style={styles.icon}>
                    <Icon
                        name='facebook-f'
                        type='font-awesome'
                        color='#ffffff'

                    />
                </View>
                <Text style={styles.text}>SIGN IN WITH FACEBOOK</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 5,
        flexDirection: "row",
        borderRadius: 4,
        alignItems: "center",
        width: "80%",
        height: 40,
        backgroundColor: "#3b5998",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    icon: {
        height: 40,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        backgroundColor: "#1e376b"
    },
    text: {
        marginLeft: 10,
        fontSize: 20,
        color: "#ffffff"
    }
})