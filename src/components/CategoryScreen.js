import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';

import styles, {ThemeColors} from '../styles/main.style';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {categoryList: ''};
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', async () => {
      console.log('willFocus runs');
    });
    this.setState(
      {
        categoryList: [
          'FICTION',
          'DRAMA',
          'HUMOR',
          'POLITICS',
          'PHILOSOPHY',
          'HISTORY',
          'ADVENTURE',
        ],
        screenHeight: Dimensions.get('screen').height,
        screenWidth: Dimensions.get('screen').width,
      },
      () => {
        console.log('screenHeight: ', this.state.screenHeight);
        console.log('screenWidth: ', this.state.screenWidth);
      },
    );
    Dimensions.addEventListener('change', () => {
      this.setState(
        {
          screenHeight: Dimensions.get('screen').height,
          screenWidth: Dimensions.get('screen').width,
        },
        () => {
          console.log('screenHeight: ', this.state.screenHeight);
          console.log('screenWidth: ', this.state.screenWidth);
        },
      );
    });
  }

  renderHeader = () => (
    <View style={styles.Header}>
      <View>
        <Text style={styles.Heading}>Gutenberg Project</Text>
      </View>
      <View>
        <Text style={styles.Description}>
          A social cataloging website that allows you to freely search its
          database of books, annotations, and reviews.
        </Text>
      </View>
    </View>
  );

  renderData = ({item, index}) => (
    <View
      style={[
        styles.Card,
        {
          width:
            this.state.screenHeight > this.state.screenWidth ? '95%' : '47%',
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.CategoryList}
        onPress={() => {
          Actions.booksScreen({
            title: <Text style={styles.NavBar}>{item}</Text>,
            topic: item,
          });
        }}>
        <View style={styles.Row}>
          <View style={styles.Icon}>
            <Image
              style={{width: 32, height: 32}}
              source={
                index == 0
                  ? require('../images/menu-fiction.png')
                  : index == 1
                  ? require('../images/menu-drama.png')
                  : index == 2
                  ? require('../images/menu-humor.png')
                  : index == 3
                  ? require('../images/menu-politics.png')
                  : index == 4
                  ? require('../images/menu-philosophy.png')
                  : index == 5
                  ? require('../images/menu-history.png')
                  : require('../images/menu-adventure.png')
              }
            />
          </View>
          <View>
            <Text style={styles.MenuText}>{item}</Text>
          </View>
        </View>
        <View>
          <Icon name="arrow-forward" size={40} color="#5E56E7" />
        </View>
      </TouchableOpacity>
    </View>
  );

  /**
   * render() this the main function which used to display different view
   * and contain all view related information.
   */
  render() {
    return (
      <>
        <SafeAreaView style={{backgroundColor: ThemeColors.primaryColor}} />
        <SafeAreaView>
          <View>
            <View style={styles.FlatListContainer}>
              {this.state.screenHeight > this.state.screenWidth ? (
                <FlatList
                  key={'_'}
                  horizontal={false}
                  numColumns={1}
                  ListHeaderComponent={this.renderHeader}
                  data={this.state.categoryList}
                  renderItem={this.renderData}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <FlatList
                  key={'#'}
                  horizontal={false}
                  ListHeaderComponent={this.renderHeader}
                  numColumns={2}
                  data={this.state.categoryList}
                  renderItem={this.renderData}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default CategoryScreen;
