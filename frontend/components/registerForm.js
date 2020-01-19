import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default class RegisterForm extends Component {

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
        //Validate form
        //Send request
        const url = "http://localhost:3000"
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
            this.setState({error:"Sorry we are having problems creating your account. Please try again later."})
          }
        //Redirect
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
                        onChangeText={(text)=> this.setState({firstName:text.trim()})}
                        value = {this.state.firstName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        autoCapitalize="words"
                        autoCompleteType="name"
                        autoCorrect={false}
                        maxLength={30}
                        onChangeText={(text)=> this.setState({lastName:text.trim()})}
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
                        onChangeText={(text)=> this.setState({email:text.trim()})}
                        value = {this.state.email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        autoCompleteType="tel"
                        autoCorrect={false}
                        maxLength={30}
                        onChangeText={(text)=> this.setState({phoneNumber:text.trim()})}
                        value = {this.state.phoneNumber}
                    />
                </View>

                <View style={styles.group}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        autoCompleteType="password"
                        autoCorrect={false}
                        maxLength={250}
                        onChangeText={(text)=> this.setState({password:text.trim()})}
                        onFocus={()=>this.setState({slidUp:true})}
                        onBlur={()=> this.setState({slidUp:false})}
                        value = {this.state.password}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        autoCorrect={false}
                        maxLength={250}
                        onChangeText={(text)=> this.setState({confirmPassword:text.trim()})}
                        onFocus={()=>this.setState({slidUp:true})}
                        onBlur={()=>this.setState({slidUp:false})}
                        value = {this.state.confirmPassword}
                    />
                
                </View>
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
        backgroundColor:"#FF5050"
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
    form: {
        flex:4,
        flexDirection:"column",
        alignItems:"center",
        paddingTop:20,
        backgroundColor:"purple"
        //backgroundColor:"#ebedf0"
    },
    group:{
        alignSelf:"stretch",
        justifyContent:"center",
        backgroundColor:"green",
        marginVertical:5
    },
    input:{
       backgroundColor:"#EFEFEF",
       marginVertical:5,
       paddingHorizontal:5,
       borderRadius:4,
       marginHorizontal:25,
       height:50
    },
    submit:{
        height:60,
        alignSelf:"stretch",
        alignItems:"center",
        justifyContent:"center",
        marginTop:"auto",
        backgroundColor:"#FF5050"
    },
    submitText:{
        fontSize:35
    }
  });
  