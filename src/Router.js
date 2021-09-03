import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {
  Actions,
  Scene,
  Router,
  Modal,
  Tabs,
  Drawer,
  Stack,
} from 'react-native-router-flux';

import CategoryScreen from './components/CategoryScreen';
import BooksScreen from './components/BooksScreen';

let ScreenWidth = Dimensions.get('window').width;
/**
 *  RouterComponent is rendered when that route matches the URL assicated with Component.
 *  initial :- this props Indicate the first Component shown when App launch in device.
 * check this link for more detail:- https://www.npmjs.com/package/react-native-router-flux
 */

const RouterComponent = props => {
  const {authenticated} = props;

  return (
    <Router>
      <Scene key="root">
        <Scene
          key="categoryScreen"
          component={CategoryScreen}
          hideNavBar={true}
          initial={true}
        />
        <Scene
          key="booksScreen"
          component={BooksScreen}
          // hideNavBar={true}
          back={true}
          initial={false}
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
