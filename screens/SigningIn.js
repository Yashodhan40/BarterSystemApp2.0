import * as React from 'react';
import {View,Text,TextInput,TouchableOpacity,KeyboardAvoidingView,StyleSheet, Alert,Modal} from 'react-native';
import db from '../config';
import firebase from 'firebase';

 export default class WelcomeScreen extends React.Component{
     constructor(){
         super();
         this.state={
             email:'',
             password:'',
             name:'',
             name2:'',
             contact:'',
             password:'',
             cP:'',
             address:'',
             isModalVisible:'false'
         }
     }
     signUp=(email,password,cP)=>{
         if (password !== cP){ 
              return Alert.alert("Password Doesn't Match");
         }else{
         firebase.auth().createUserWithEmailAndPassword(email,password).then((response)=>{
             db.collection("Users").add({
                 FirstName:this.state.name,
                 LastName:this.state.name2,
                 Contact:this.state.contact,
                 Email:this.state.emailId,
                 Address:this.state.address
             })
             return Alert.alert("Successfully Signed Up");
         }).catch((error)=>{
             var errorCode = error.code;
             var errorMessage = error.message;
             Alert.alert(errorMessage); 
         })
         }
     }

     signIn=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password).then((response)=>{
            return Alert.alert("Successfully Signed In");
        }).catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            Alert.alert(errorMessage); 
        })
    }

    showModal=()=>{
        <Modal animationType='fade' transparent={true} visible={this.state.isModalVisible} >
            <View>
                <KeyboardAvoidingView behavior="padding" enabled>
                <TextInput
                placeholder="First Name"
                maxLength={9}
                onChangeText={text=>{this.setState({name:text})}}
                value={this.state.name}
                />
                <TextInput
                placeholder="Last Name"
                maxLength={15}
                onChangeText={text=>{this.setState({name2:text})}}
                value={this.state.name2}
                />
                <TextInput
                placeholder="address"
                multiline={true}
                onChangeText={text=>{this.setState({address:text})}}
                value={this.state.address}
                />
                <TextInput
                placeholder="Mobile No."
                maxLength={10}
                keyboardType="numeric"
                onChangeText={text=>{this.setState({contact:text})}}
                value={this.state.contact}
                />
                <TextInput 
                placeholder="email Id"
                keyboardType="email-address"
                onChangeText={text=>{this.setState({email:text})}}
                value={this.state.email}
                />
                <TextInput
                placeholder="password"
                secureTextEntry={true}
                onChangeText={text=>{this.setState({password:text})}}
                value={this.state.password}
                />
                <TextInput
                placeholder="confirm password"
                secureTextEntry={true}
                onChangeText={text=>{this.setState({cP:text})}}
                value={this.state.cP}
                />

                <TouchableOpacity onPress={()=>this.signUp(this.state.emailId,this.state.password,this.state.cP)}>
                    <Text>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.setState({'isModalVisible':false})}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>

            </View>
        </Modal>
    }
     render(){
        return(
            <View style={styles.back}>
               
                    {this.showModal()}
              <KeyboardAvoidingView behavior="padding"enabled>

                <TextInput
                    style={styles.e}
                    placeholder="email Id"
                    keyboardType="email-address"
                    onChangeText={text=>{this.setState({email:text})}}
                    value={this.state.email}
                />
                <TextInput
                style={styles.p}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={text=>{this.setState({password:text})}}
                value={this.state.password}
                />

                <TouchableOpacity 
                style={styles.b}
                onPress={()=>this.signIn(this.state.email,this.state.password)}>
                    <Text>Sign In</Text>
                </TouchableOpacity>
               
                <TouchableOpacity 
                style={styles.a}
                onPress={()=>this.setState({isModalVisible:true})}>
                    <Text>Sign Up</Text>
                </TouchableOpacity>

                </KeyboardAvoidingView>
            </View>
        )
     }   
    
}
const styles = StyleSheet.create({
    a:{
        backgroundColor:'#00FFFF',
        alignSelf:'center',
        width:90,
        borderColor:'green',
        borderWidth:2,
        borderRadius:5,
        paddingLeft:20,
        marginTop:10,
        marginBottom:20,
        
    },
    b:{
        backgroundColor:'gold',
        alignSelf:'center',
        width:90,
        borderColor:'green',
        borderWidth:2,
        borderRadius:5,
        paddingLeft:20,
        marginTop:0
    },
    e:{
        marginTop:150,
        //color:'grey',
        backgroundColor:'#EEEEBB',
        width:290,
        alignSelf:'center',
        fontSize:40
    },
    p:{
        marginTop:20,
        backgroundColor:"#EEEEBB",
        width:290,
        alignSelf:'center',
        marginBottom:20
    },
    back:{
        backgroundColor:'#33BB00',
        marginBottom:0

    }
})  