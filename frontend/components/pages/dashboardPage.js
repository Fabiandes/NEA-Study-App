import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <ScrollView style={StyleSheet.page}>
                <View style={styles.header}>

                </View>
                <View style={styles.pageContent}>
                    <ScrollView horizontal={true} style={styles.scrollableSection}>

                    </ScrollView>
                    <ScrollView horizontal={true} style={styles.scrollableSection}>

                    </ScrollView>
                    <View style={styles.leaderboard}>

                    </View>
                    <View style={styles.navBar}>
                        <TouchableWithoutFeedback style={styles.homeButton}>

                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={styles.createButton}>
                            
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={styles.settingButton}>

                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </ScrollView>
        );
    }
}    

const styles = StyleSheet.create({
    page:{
        height:"100%"
    },
    header:{
        flex:2
    },
    content:{
        flex:3
    },
    navBar:{
        flexDirection:"row",
        justifyContent:"space-evenly"
    },
    scrollableSection:{
        height: "20%"
    }
})
