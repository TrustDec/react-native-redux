import React, { Component } from 'react';
import ReactNative from 'react-native';
import App from '../../components/App';
const {
    StyleSheet,
    Text,
    View,
    Button,
    Image
} = ReactNative

export default class User extends Component {
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