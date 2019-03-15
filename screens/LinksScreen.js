import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from '../navigation/AppNavigator';

import Amplify, { API } from 'aws-amplify';
import awsmobile from '../src/aws-exports';
Amplify.configure(awsmobile);

export default class LinkScreen extends React.Component {
  state = {
    isLoadingComplete: false,
	apiResponse: null,
	noteId: '',
	itemId: ''
  };
  
  handleChangeNoteId = (event) => {
    this.setState({noteId: event});
}

  handleChangeItemId = (event) => {
    this.setState({itemId: event});
}

// Create a new Note according to the columns we defined earlier
  async saveNote() {
    let newNote = {
      body: {
        "NoteTitle": "My first note!",
        "NoteContent": "This is so cool!",
        "NoteId": this.state.noteId
      }
    }
    const path = "/items";

    // Use the API module to save the note to the database
    try {
      const apiResponse = await API.put("theListApi", path, newNote)
      console.log("response from saving note: " + apiResponse);
      this.setState({apiResponse});
    } catch (e) {
      console.log(e);
    }
  }
  
    // noteId is the primary key of the particular record you want to fetch
    async getNote() {
      const path = "/items/object/" + this.state.noteId;
      try {
        const apiResponse = await API.get("theListApi", path);
        console.log("response from getting note: " + apiResponse);
        this.setState({apiResponse});
      } catch (e) {
        console.log(e);
      }
    }
	
  
  // Create a new Note according to the columns we defined earlier
  async saveOrder() {
	  //orderdate, customerid, orderid, itemid, price, quantity, status
    let newNote = {
      body: {
        "orderdate": "My first note!",
        "customerid": "This is so cool!",
        "orderid": this.state.noteId,
		"itemid": this.state.itemId,
		"price": "1",
		"quantity": "1",
		"status": "New",
      }
    }
    const path = "/order";

    // Use the API module to save the note to the database
    try {
      const apiResponse = await API.put("theOrderApi", path, newNote)
      console.log("response from saving note: " + apiResponse);
      this.setState({apiResponse});
    } catch (e) {
      console.log(e);
    }
  }
  
  	// noteId is the primary key of the particular record you want to fetch
    async getOrder() {
      const path = "/order/object/" + this.state.noteId+"/1";
      try {
        const apiResponse = await API.get("theOrderApi", path);
        console.log("response from getting note: " + apiResponse);
        this.setState({apiResponse});
      } catch (e) {
        console.log(e);
      }
    }
	
	  	// noteId is the primary key of the particular record you want to fetch
    async getOrders() {
      const path = "/order/" + this.state.noteId;
      try {
        const apiResponse = await API.get("theOrderApi", path);
        console.log("response from getting note: " + apiResponse);
        this.setState({apiResponse});
      } catch (e) {
        console.log(e);
      }
    }
	
	// noteId is the primary key of the particular record you want to fetch
    async getAllOrders() {
      const path = "/order/allObjects" 
      try {
        const apiResponse = await API.get("theOrderApi", path);
        console.log("response from getting note: " + apiResponse);
        this.setState({apiResponse});
      } catch (e) {
        console.log(e);
      }
    }
  


  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
       <View style={styles.container}>
        <Text>Response: {this.state.apiResponse && JSON.stringify(this.state.apiResponse)}</Text>
        <Button title="Save Note" onPress={this.saveNote.bind(this)} />
		<Button title="Save order" onPress={this.saveOrder.bind(this)} />
		<Button title="Get Note" onPress={this.getNote.bind(this)} />
		<Button title="Get Order" onPress={this.getOrder.bind(this)} />
		<Button title="Get All Items for Order" onPress={this.getOrders.bind(this)} />
		<Button title="Get All orders" onPress={this.getAllOrders.bind(this)} />
        <TextInput style={styles.textInput} autoCapitalize='none' onChangeText={this.handleChangeNoteId}/>
		<TextInput style={styles.textInput} autoCapitalize='none' onChangeText={this.handleChangeItemId}/>
		</View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('../assets/images/robot-dev.png'),
        require('../assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
      margin: 15,
      height: 30,
      width: 200,
      borderWidth: 1,
      color: 'green',
      fontSize: 20,
      backgroundColor: 'black'
   }
});
