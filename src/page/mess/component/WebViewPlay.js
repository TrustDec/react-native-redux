import React, { Component } from 'react';
import ReactNative from 'react-native';
import { StackNavigator } from 'react-navigation';
const {
    StyleSheet,
    View,
    Animated,
    WebView,
} = ReactNative;
export default class WebViewPlay extends Component {
    static navigationOptions = {
        headerTitle: 'WebViewPlay',
        tabBarVisible: false,
        headerTitleStyle:{ alignSelf:'center',color:'#fff'},
        headerStyle:{ backgroundColor:'#2C3E51' },
    }
    render(){
        return(
            <WebView
                //source={{uri: `https://www.baidu.com`}}
                source={{uri: `http://api.biaoxintong.com:8800/health/page/classroom/classroom.html`}}
                mixedContentMode={'compatibility'}
                startInLoadingState={true}
                bounces={true}
            />
        )
    }
}