import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FBButton from './fb_button';
import GoogleButton from './google_button';

export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleSubmit(){
        const url = "http://localhost:4000/login"
        try {
            let response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                body: JSON.stringify(this.state.formData) // body data type must match "Content-Type" header
              }
            );
            // let responseJson = await response.json();
            this.setState({error:JSON.stringify(response.status)})
            switch(response.status){
                case 200:
                    //Go to login page
                    break;
                case 401:
                    this.setState({error:"Invalid Credentials."})
                default:
                    this.setState({error:response.statusText})
                    //Just display the message
            }
            //Else display status message and empty password field.
          } catch (error) {
            console.error(error);
          }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.page}>
                    <View style={styles.header}>

                    </View>
                    <View style={styles.form}>
                        <View style={styles.authForm}>
                            <FBButton />
                            <GoogleButton title="Google" />
                        </View>
                        <Text style={{color:'#7E7C7C'}}>or</Text>
                        <View style={styles.inputForm}>
                            <TextInput
                                style={styles.input}
                                placeholder="user@example.co.uk"
                                onChange={(value) => { this.setState({ username: value }) }}
                                value={this.state.username}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="*************"
                                onChange={(value) => { this.setState({ password: value }) }}
                                value={this.state.password}
                            />
                        </View>
                        <View style={styles.footer}>
                            <TouchableWithoutFeedback>
                                <Text style={{marginBottom:5,color:'#7E7C7C'}}>Forgot Password?</Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <Text style={{marginBottom:5,color:'#7E7C7C'}}>Haven't got an account? Create one!</Text>
                            </TouchableWithoutFeedback>
                            
                            <TouchableOpacity onPress={this.handleSubmit} style={styles.sumbitButton}>
                                <Text style={{color:"white", fontSize:30}}>LOGIN</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    form: {
        flex: 1,
        alignItems: "center",
        alignSelf: "stretch",
    },
    authForm: {
        flex: 1,
        paddingHorizontal: 25,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "auto",
        alignSelf: "stretch",
    },
    inputForm: {
        flex: 1,
        paddingHorizontal: 25,
        justifyContent: "center",
        alignSelf: "stretch",
        marginVertical:10
    },
    footer: {
        marginTop: "auto",
        alignItems: "center",
        alignSelf: "stretch"
    },
    input: {
        backgroundColor: "#EFEFEF",
        marginVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        marginHorizontal: 25,
        height: 45,
        fontSize:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 3,

        elevation: 2,
    },
    header: {
        flex: 1,
        backgroundColor: "#FF5050"
    },
    sumbitButton: {
        backgroundColor: "#FF5050",
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        marginTop: 5
    }
})
