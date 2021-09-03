import {StyleSheet, PixelRatio, Dimensions} from 'react-native';
import {Fonts} from '../utils/Fonts';
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

export const ThemeColors = {
  primaryColor: '#5E56E7',
  secondaryColor: '#F8F7FF',
  darkgreyColor: '#333333',
  lightgreyColor: '#A0A0A0',
  offwhiteColor: '#F0F0F6',

  whiteColor: '#ffffff',
  blackColor: '#000000',
  // redColor: '#e21313',
  // greenColor: '#0AC725',
  // blueColor: '#1DBCF3',
  // orangeColor: '#FF9900',
};

export default StyleSheet.create({
  Header: {
    backgroundColor: ThemeColors.secondaryColor,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    paddingTop: 50,
    paddingBottom: 30,
  },
  Heading: {
    fontFamily: Fonts.MontseratSemibold,
    color: ThemeColors.primaryColor,
    fontSize: 28,
    paddingBottom: 20,
    textAlign: 'center',
  },
  Description: {
    fontFamily: Fonts.MontseratRegular,
    color: ThemeColors.primaryColor,
    fontSize: 16,
    textAlign: 'justify',
  },
  NavBar: {
    fontFamily: Fonts.MontseratSemibold,
    color: ThemeColors.primaryColor,
    fontSize: 22,
  },
  FlatListContainer: {
    backgroundColor: ThemeColors.offwhitweColor,
    // paddingLeft: 10,
    // paddingRight: 10,
    // paddingTop: 10,
    // paddingBottom: 10,
    width: '100%',
  },
  Card: {
    backgroundColor: ThemeColors.whiteColor,
    borderRadius: 5,
    shadowColor: ThemeColors.blackColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  CategoryList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Icon: {
    width: 60,
    height: 60,
    backgroundColor: ThemeColors.whiteColor,
    borderRadius: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MenuText: {
    fontSize: 18,
    fontFamily: Fonts.MontseratSemibold,
    color: ThemeColors.primaryColor,
    marginLeft: 10,
  },
  BookList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderColor: ThemeColors.primaryColor,
    borderWidth: 1,
    backgroundColor: ThemeColors.secondaryColor,
    borderRadius: 10,
  },
  SearchIcon: {paddingLeft: 10, paddingRight: 10},
  SearchText: {width: '75%'},
  Roundimg: {
    borderRadius: 10,
    width: '100%',
    height: 200,
  },
  BookName: {
    fontFamily: Fonts.MontseratRegular,
    color: ThemeColors.darkgreyColor,
    fontSize: 16,
  },
  BookAuthor: {
    fontFamily: Fonts.MontseratRegular,
    color: ThemeColors.lightgreyColor,
    fontSize: 12,
  },
});
