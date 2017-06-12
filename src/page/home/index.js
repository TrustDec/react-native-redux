import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image
} from 'react-native';
import App from '../../components/App';
//import { userToken } from '../../constant/TestUserToken';
export default class Home extends Component {
    render(){
        return(
            <View style={styles.container}>
               <App/>
            </View>
        );
    }
} 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});