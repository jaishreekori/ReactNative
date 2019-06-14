import React, { Component } from 'react';
import { View, StyleSheet, Button, TextInput, Text, Switch } from 'react-native';

export default class App extends Component {
   constructor() {
      super();
      this.state = {
         switch1Value: false,
         switch2Value: false,
         switch3Value: false,
         email: "",
      }
   };
   handleSubmit = (evt) => {
      if (!this.validateEmail(this.state.email)) {
         alert('error !')
       } else {
         alert('Data Saved Successfully !')
       }
      }
      
   toggleSwitch1 = (value) => {
      this.setState({ switch1Value: value })
      console.log('Switch 1 is: ' + value)
   }
   toggleSwitch2 = (value) => {
      this.setState({ switch2Value: value })
      console.log('Switch 2 is: ' + value)
   }
   toggleSwitch3 = (value) => {
      this.setState({ switch3Value: value })
      console.log('Switch 3 is: ' + value)
   }
   validateEmail = (email) => {
      var re = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
      return re.test(email);
    };
    
   render() {
      return (
         <View style={styles.container}>
            <Text style={styles.h2text}>User Details</Text>
            <Text style={{ justifyContent: 'center', fontSize: 20, marginRight: 20, fontWeight: 'bold' }}>First Name</Text>
            <TextInput style={styles.input} placeholder='Enter F.Name'>
            </TextInput>
            <Text style={{ justifyContent: 'center', fontSize: 20, marginRight: 20, fontWeight: 'bold' }}>Last Name</Text>
            <TextInput style={styles.input} placeholder='Enter L.Name'></TextInput>
            <Text style={{ justifyContent: 'center', fontSize: 20, marginRight: 20, fontWeight: 'bold' }}>Email</Text>
            <TextInput style={styles.input} placeholder='Email'
               onChange={this.validateEmail}
            ></TextInput>
            <Text style={{ justifyContent: 'center', fontSize: 20, marginRight: 20, marginBottom: 10, fontWeight: 'bold' }}>Alerts For :</Text>
            <Text style={{ justifyContent: 'center', fontSize: 20, marginRight: 20 }}>SMS</Text>
            <Switch
               onValueChange={this.toggleSwitch1}
               value={this.state.switch1Value}
            />
            <Text style={{ justifyContent: 'center', fontSize: 20, marginRight: 20 }}>Email</Text>
            <Switch
               onValueChange={this.toggleSwitch2}
               value={this.state.switch2Value}
            />
            <Text style={{ justifyContent: 'center', fontSize: 20, marginRight: 20 }}>WhatsApp</Text>
            <Switch style={{ marginBottom: 20 }}
               onValueChange={this.toggleSwitch3}
               value={this.state.switch3Value}
            />
            <Button
               title="Save Details"
               onPress={this.handleSubmit}
            />
         </View>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      justifyContent: 'center',
      marginTop: 50,
      padding: 10,
      backgroundColor: '#ffffff',
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 2
   },
   h2text: {
      fontFamily: 'Helvetica',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      fontSize: 30,
      fontWeight: 'bold',
   },
});

