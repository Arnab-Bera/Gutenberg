/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {View, StatusBar, SafeAreaView, Platform} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import Router from './Router';
import styles, {ThemeColors} from './styles/main.style';

class App extends Component {
  constructor() {
    super();
    this.state = {authenticated: false};
  }

  /**
   * render() this the main function which used to display different view.
   */

  render() {
    return (
      <>
        {Platform.OS == 'ios' ? (
          <StatusBar translucent barStyle={'light-content'}></StatusBar>
        ) : (
          <View
            style={{
              height: StatusBar.currentHeight,
              backgroundColor: ThemeColors.primaryColor,
            }}>
            <StatusBar
              backgroundColor={ThemeColors.primaryColor}
              translucent
              barStyle={'light-content'}></StatusBar>
          </View>
        )}

        <Router authenticated={this.state.authenticated} />
        <FlashMessage
          style={{
            marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
          }}
          position="top"
          animated={true}
        />
      </>
    );
  }
}

export default App;
