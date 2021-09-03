import React, {Component} from 'react';
import {View, Modal, ActivityIndicator, Text} from 'react-native';

const ToastMsg = props => {
  const {loading} = props;

  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          //backgroundColor: '#00000040',
        }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            //height: 100,
            width: '90%',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginBottom: 50,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowRadius: 10,
            shadowOpacity: 1.0,
          }}>
          <Text
            style={{
              fontSize: 20,
              padding: 10,
              width: '100%',
              textAlign: 'center',
            }}>
            Login Login Login Login Login Login Login Login Login Login Login
            Login Login Login Login Login Login
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ToastMsg;
