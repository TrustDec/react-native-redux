import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Global from '../util/Global';
import Home from './home';
import Mess from './mess';
import User from './user';
// home
// speech
// grid
// user
export default Main = TabNavigator({
  Mess: {
    screen: Mess,
    navigationOptions: ({navigation})=>TabOptions('Mess','home',navigation)
  },
  Home: {
    screen: Home,
    navigationOptions: ({navigation})=>TabOptions('Home','speech',navigation)
  },
  User: {
    screen: User,
    navigationOptions: ({navigation})=>TabOptions('User','grid',navigation)
  }
}, {
  tabBarOptions: {
    activeTintColor: '#19BD9C',
    inactiveTintColor:'#93A5A8',
    indicatorStyle:{height:0},
    lazy:true,
    showIcon:true,
    showLabel:true,
    upperCaseLabel:false,
    scrollEnabled:false,
    labelStyle:{
      margin:0,
      //color:'#fff',
      fontSize:ActualPixel(10),
    },
    style: {
            backgroundColor:'#33495E'
    },
  },
  tabBarPosition:'bottom',
  swipeEnabled:false,
  animationEnabled:false,
});
const TabOptions = (tabBarTitle,normalImage,navigation) => {
  global.NavRoute = navigation;
  let {state,goBack} = navigation;
  const tabBarLabel = tabBarTitle;
  //const tabBarVisible = false;
  const tabBarIcon = ({tintColor})=>{
    return(
        <Icon name={normalImage} size={20} color={tintColor} iconStyle={{margin:30}}/>
    )
  };
  //const tabBarVisible = true;
  return {tabBarLabel,tabBarIcon}
}



