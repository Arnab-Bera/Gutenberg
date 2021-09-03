import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Linking,
  Dimensions,
} from 'react-native';

import styles, {ThemeColors} from '../styles/main.style';
import FlushMsg from '../utils/FlushMsg';
import {Apis} from '../utils/Apis';
import Loader from '../utils/Loader';
import Icon from 'react-native-vector-icons/Ionicons';

class BooksScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      page: 1,
      totalCount: 0,
      loading: false,
      ended: false,
      apiLoader: true,
      topic: props.navigation.state.params.topic,
      search: '',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', async () => {
      console.log('willFocus runs');
    });
    this.setState(
      {
        listData: [],
        screenHeight: Dimensions.get('screen').height,
        screenWidth: Dimensions.get('screen').width,
      },
      () => {
        console.log('screenHeight: ', this.state.screenHeight);
        console.log('screenWidth: ', this.state.screenWidth);
      },
    );
    this.getBooksListApi();
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

  loaderShowHide = status => {
    this.setState({
      apiLoader: status,
    });
  };

  getSearchBooksListApi = () => {
    // this.loaderShowHide(true);
    this.setState({listData: []});
    let api = 'books?search=' + this.state.search;
    Apis.callGetApis(api, null).then(
      function (result) {
        this.loaderShowHide(false);
        if (result.count > 0) {
          if (result.results.length > 0) {
            this.setState(
              {
                listData: [...this.state.listData, ...result.results],
                totalCount: result.count,
                loading: false,
                ended: false,
              },
              () => {
                // console.log('listDatalistDatalistData: ', this.state.listData);
              },
            );
          } else {
            this.setState(
              {
                listData: [...this.state.listData, ...result.results],
                totalCount: 0,
                loading: false,
                ended: true,
              },
              () => {
                // console.log('listDatalistDatalistData: ', this.state.listData);
              },
            );
          }
        } else {
          this.setState({
            listData: [...this.state.listData, ...result.results],
            loading: false,
            ended: true,
          });
        }
      }.bind(this),
      function () {
        //console.log('There was an error fetching the time');
        //this.loaderShowHide(false);
        let data = [];
        this.setState({
          listData: [...this.state.listData, ...data],
          loading: false,
          ended: true,
        });
        FlushMsg.showError(
          'There was an error fetching the time, please try again later.',
        );
      }.bind(this),
    );
  };

  getBooksListApi = () => {
    // this.loaderShowHide(true);
    let api = 'books?topic=' + this.state.topic + '&page=' + this.state.page;
    Apis.callGetApis(api, null).then(
      function (result) {
        this.loaderShowHide(false);
        if (result.count > 0) {
          if (result.results.length > 0) {
            this.setState(
              {
                listData: [...this.state.listData, ...result.results],
                totalCount: result.count,
                loading: false,
                ended: false,
              },
              () => {
                // console.log('listDatalistDatalistData: ', this.state.listData);
              },
            );
          } else {
            this.setState(
              {
                listData: [...this.state.listData, ...result.results],
                totalCount: 0,
                loading: false,
                ended: true,
              },
              () => {
                // console.log('listDatalistDatalistData: ', this.state.listData);
              },
            );
          }
        } else {
          this.setState({
            listData: [...this.state.listData, ...result.results],
            loading: false,
            ended: true,
          });
        }
      }.bind(this),
      function () {
        //console.log('There was an error fetching the time');
        //this.loaderShowHide(false);
        let data = [];
        this.setState({
          listData: [...this.state.listData, ...data],
          loading: false,
          ended: true,
        });
        FlushMsg.showError(
          'There was an error fetching the time, please try again later.',
        );
      }.bind(this),
    );
  };

  renderHeader = () => (
    <View style={styles.BookList}>
      <View style={styles.Row}>
        <View style={styles.SearchIcon}>
          <Icon name="search-outline" size={30} color="#A0A0A0" />
        </View>
        <View style={styles.SearchText}>
          <TextInput
            style={{
              color: ThemeColors.primaryColor,
              fontSize: 16,
            }}
            placeholder={'Search'}
            value={this.state.search}
            onChangeText={text => {
              this.setState({search: text}, () => {
                if (this.state.search.length == 0) {
                  this.setState({listData: [], page: 1}, () => {
                    this.getBooksListApi();
                  });
                } else {
                  this.getSearchBooksListApi();
                }
              });
            }}
          />
        </View>
      </View>
      <View>
        {this.state.search.length > 0 && (
          <TouchableOpacity
            style={{paddingRight: 10}}
            onPress={() => {
              this.setState({search: ''}, () => {
                this.setState({listData: [], page: 1}, () => {
                  this.getBooksListApi();
                });
              });
            }}>
            <Icon name="close-outline" size={30} color="#A0A0A0" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  renderFooter = () => {
    const {ended} = this.state;

    if (this.state.listData.length == 0 && ended)
      return (
        <View style={styles.PersonList}>
          <Text
            style={{
              textAlign: 'center',
            }}>
            No records found to display.
          </Text>
        </View>
      );

    if (!this.state.loading) return null;

    return (
      <ActivityIndicator style={{color: '#000', padding: 20}} color="#001684" />
    );
  };

  renderData = ({item, index}) => (
    <TouchableOpacity
      style={{
        width: this.state.screenHeight > this.state.screenWidth ? '50%' : '25%',
        padding: 5,
      }}
      activeOpacity={0.7}
      onPress={() => {
        console.log(
          'text/html; charset=utf-8',
          item.formats['text/html; charset=utf-8'],
        );
        console.log('application/pdf', item.formats['application/pdf']);
        console.log(
          'text/plain; charset=utf-8',
          item.formats['text/plain; charset=utf-8'],
        );
        let url = '';
        if (item.formats['text/html; charset=utf-8'] !== undefined)
          url = item.formats['text/html; charset=utf-8'];
        else if (item.formats['text/html; charset=utf-8'] !== undefined)
          url = item.formats['application/pdf'];
        else if (item.formats['text/html; charset=utf-8'] !== undefined)
          url = item.formats['text/plain; charset=utf-8'];
        else FlushMsg.showError('No viewable version available');

        console.log("(url.split('.'))", url.split('.').pop());

        if (url.split('.').pop() == 'zip') {
          FlushMsg.showError('Zip files are NOT viewable files');
        } else {
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              console.log("Don't know how to open URI: " + url);
            }
          });
        }
      }}>
      <View>
        <Image
          source={
            item.formats['image/jpeg'] === undefined
              ? {
                  uri: 'https://mybookee.com/cover/984/basfoliar-ca-sl-programa-de-fertilizaci243-984b0d.jpg',
                }
              : {uri: item.formats['image/jpeg']}
          }
          style={styles.Roundimg}
        />

        <Text numberOfLines={2} style={styles.BookName}>
          {item.title}
        </Text>

        <Text style={styles.BookAuthor}>
          {item.authors.length > 0 ? item.authors[0].name : 'No Author Found'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  /**
   * render() this the main function which used to display different view
   * and contain all view related information.
   */
  render() {
    return (
      <>
        <SafeAreaView style={{backgroundColor: ThemeColors.primaryColor}} />
        {this.state.apiLoader && <Loader />}
        <SafeAreaView>
          <View
            style={[
              styles.FlatListContainer,
              {paddingLeft: 10, paddingRight: 10},
            ]}>
            {this.state.screenHeight > this.state.screenWidth ? (
              <FlatList
                key={'_'}
                style={{paddingBottom: 40}}
                numColumns={2}
                ListHeaderComponent={this.renderHeader}
                data={this.state.listData}
                keyExtractor={(item, index) => {
                  return 'key-' + index.toString();
                }}
                renderItem={this.renderData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={this.renderFooter.bind(this)}
                onEndReached={({distanceFromEnd}) => {
                  //   console.log(
                  //     'distanceFromEnd distanceFromEnd:: ',
                  //     distanceFromEnd,
                  //   );
                  if (
                    !this.state.ended &&
                    parseInt(this.state.totalCount) !=
                      this.state.listData.length
                  ) {
                    this.setState(
                      {
                        loading: true,
                        page: this.state.page + 1,
                      },
                      () => {
                        this.getBooksListApi();
                      },
                    );
                  }
                }}
                scrollEventThrottle={400}
              />
            ) : (
              <FlatList
                key={'#'}
                style={{paddingBottom: 40}}
                ListHeaderComponent={this.renderHeader}
                numColumns={4}
                data={this.state.listData}
                keyExtractor={(item, index) => {
                  return 'key-' + index.toString();
                }}
                renderItem={this.renderData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={this.renderFooter.bind(this)}
                onEndReached={({distanceFromEnd}) => {
                  //   console.log(
                  //     'distanceFromEnd distanceFromEnd:: ',
                  //     distanceFromEnd,
                  //   );
                  if (
                    !this.state.ended &&
                    parseInt(this.state.totalCount) !=
                      this.state.listData.length
                  ) {
                    this.setState(
                      {
                        loading: true,
                        page: this.state.page + 1,
                      },
                      () => {
                        this.getBooksListApi();
                      },
                    );
                  }
                }}
                scrollEventThrottle={400}
              />
            )}
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default BooksScreen;
