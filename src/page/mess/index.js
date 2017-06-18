import React, { Component } from 'react';
import ReactNative from 'react-native';
import Swiper from '../../components/Swiper';
const {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
} = ReactNative;
export default class Mess extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Swiper style={styles.swiper}>
                    <View style={styles.page1}></View>
                    <View style={styles.page2}></View>
                    <View style={styles.page3}></View>
                    <View style={styles.page1}></View>
                    <View style={styles.page2}></View>
                    <View style={styles.page3}></View>
                </Swiper>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'stretch',
    },
    swiper: {
        //backgroundColor:'black'
    },
    page1: {
        flex:1,
        backgroundColor:'yellow'
    },
    page2: {
        flex:1,
        backgroundColor:'red'
    },
    page3: {
        flex:1,
        backgroundColor:'blue'
    }
});
