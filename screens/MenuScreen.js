import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import BFScreen from './BFScreen';
import LunchScreen from './LunchScreen';
import DrinksScreen from './DrinksScreen';

import { MonoText } from '../components/StyledText';

export default class MenuScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
         <Container>
        <Header hasTabs />
        <Tabs>
          <Tab heading="Break Fast">
            <BFScreen />
          </Tab>
          <Tab heading="Lunch">
            <LunchScreen />
          </Tab>
		  <Tab heading="Drinks">
            <DrinksScreen />
          </Tab>
        </Tabs>
      </Container>


      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Account Screen - CafeRock
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
