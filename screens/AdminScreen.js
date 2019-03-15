import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from '../navigation/AppNavigator';
import { Table, Row, Rows } from 'react-native-table-component';


import Amplify, { API } from 'aws-amplify';
import awsmobile from '../src/aws-exports';
Amplify.configure(awsmobile);
 
export default class ExampleOne extends Component {
	
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
  
  componentDidMount() {
	  this.getAllOrders();
  }
 
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
		<Text>Response: {this.state.apiResponse && JSON.stringify(this.state.apiResponse)}</Text>
		
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});