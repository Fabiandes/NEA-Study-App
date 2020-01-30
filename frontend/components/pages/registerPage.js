import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default class RegisterPage extends Component {

    constructor(props){
        super(props);
        this.state={
            formData:{
                firstName:"",
                lastName:"",
                email:"",
                phoneNumber:"",
                password:"",
            },
            confirmPassword:"",
            error:"Testing Error",
            slidUp:false
        };
    }

    HandleSubmit = async()=>{
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
                case 409:
                    this.setState({error:"A user with these credentials already exists."})
                default:
                    this.setState({error:response.statusText})
                    //Just display the message
            }
            //Else display status message and empty password field.
          } catch (error) {
            console.error(error);
          }
    }

    SlideUiUp = ()=>{
        this.setState({slidUp:true})
    }

  render() {
    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <View style={styles.page}>
                <View style={this.state.slidUp
                        ? styles.noHeader
                        : styles.header}>
                    <Text style={styles.error}>{this.state.error}</Text>
                </View>
                <View style={styles.form}>
                <View style={styles.group}>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        autoCapitalize="words"
                        autoCompleteType="name"
                        autoCorrect={false}
                        maxLength={30}
                        onChangeText={(text)=> this.setState({firstName:text})}
                        value = {this.state.firstName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        autoCapitalize="words"
                        autoCompleteType="name"
                        autoCorrect={false}
                        maxLength={30}
                        onChangeText={(text)=> this.setState({lastName:text})}
                        value = {this.state.lastName}
                    />
                </View>

                <View style={styles.group}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="words"
                        autoCompleteType="email"
                        autoCorrect={false}
                        maxLength={100}
                        onChangeText={(text)=> this.setState({email:text})}
                        value = {this.state.email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        autoCompleteType="tel"
                        autoCorrect={false}
                        maxLength={30}
                        onChangeText={(text)=> this.setState({phoneNumber:text})}
                        value = {this.state.phoneNumber}
                    />
                </View>

                <TouchableWithoutFeedback onPress={this.SlideUiUp}>
                <View style={styles.group}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        autoCompleteType="password"
                        autoCorrect={false}
                        maxLength={250}
                        onChangeText={(text)=> this.setState({password:text})}
                        on
                        value = {this.state.password}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        autoCorrect={false}
                        maxLength={250}
                        onChangeText={(text)=> this.setState({confirmPassword:text})}
                        value = {this.state.confirmPassword}
                    />
                
                </View>
                </TouchableWithoutFeedback>
                <TouchableOpacity onPress={this.HandleSubmit} style={styles.submit}>
                    <Text style={styles.submitText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}


let styles = StyleSheet.create({
    header:{
        flex:1,
        flexDirection:"column-reverse",
        alignItems:"center",
        backgroundColor:"#f74040"
    },
    noHeader:{
        flex:0
    },
    error:{
        backgroundColor:"blue"
    },
    page:{
        flex:1,
    },
    pageFlipped:{
        flex:1,
        flexDirection:"column-reverse"
    },
    form: {
        flex:4,
        flexDirection:"column",
        alignItems:"center",
        paddingTop:20,
        backgroundColor:"#ebedf0"
    },
    group:{
        alignSelf:"stretch"
    },
    input:{
       backgroundColor:"white",
       marginVertical:5,
       borderRadius:8,
       marginHorizontal:25,
       height:50
    },
    submit:{
        height:60,
        alignSelf:"stretch",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#f74040"
    },
    submitText:{
        fontSize:35
    }
  });
  