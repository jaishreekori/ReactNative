import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, StyleSheet, Button, TextInput, Text, Switch, Alert } from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      switch1Value: false,
      switch2Value: false,
      switch3Value: false,
      email: "",
      TextInputValue: '',
      ErrorStatus: true,
    }
  };
  handleSubmit = async () => {
    const { TextInputValue, email } = this.state;
    console.log(this.state);
    console.log(this.validateEmail(email) )
    if (TextInputValue == ""  && this.validateEmail(email) == false) {
      Alert.alert("Please enter the text to proceed");
    }
    else {
      try {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('TextInputValue', TextInputValue);
        Alert.alert("Data Saved Successfully !");
        this._retrieveData;
      } catch (error) {
        Alert.alert('error');
        // Error saving data
      }
    }
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        // We have data!!
        alert(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  onEnterText = (TextInputValue) => {
    if (TextInputValue.trim() != 0) {
      this.setState({ TextInputValue: TextInputValue, ErrorStatus: true });
    } else {
      this.setState({ TextInputValue: TextInputValue, ErrorStatus: false });
    }
  }
  onEnterEmail = (email) => {
    if (email.trim() != 0) {
      this.setState({ email: email, ErrorStatus: true });
    } else {
      this.setState({ email: email, ErrorStatus: false });
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
    var re = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
    return re.test(email);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h2text}>User Details</Text>
        <Text style={{ justifyContent: 'center', fontSize: 20, marginRight: 20, fontWeight: 'bold' }}>First Name</Text>
        <TextInput style={styles.input} placeholder='Enter F.Name'
          onChangeText={TextInputValue => this.onEnterText(TextInputValue)}
        >
        </TextInput>
        <Text style={{ justifyContent: 'center', fontSize: 20, marginRight: 20, fontWeight: 'bold' }}>Last Name</Text>
        <TextInput style={styles.input} placeholder='Enter L.Name'></TextInput>
        <Text style={{ justifyContent: 'center', fontSize: 20, marginRight: 20, fontWeight: 'bold' }}>Email</Text>
        <TextInput style={styles.input} placeholder='Email'
          onChangeText={email => this.onEnterEmail(email)}
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
