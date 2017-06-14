import React, { Component } from 'react';
import ReactNative from 'react-native';
const {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Animated,
    Easing
} = ReactNative
export default class Mess extends Component {
    componentWillMount(){
        this.animatedValue = new Animated.Value(100);
    }
    componentDidMount(){
        Animated.timing(this.animatedValue,{
            toValue: 20,
            duration: 3000,
            exsing:Easing.bounce
        }).start();
    }
    render(){
        const animatedStyle = { height:this.animatedValue };
        return(
            <View style={styles.container}>
                <Animated.View style={[styles.box,animatedStyle]}/>
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
    box:{
        width:100,
        height:100,
        backgroundColor:'red'
    }
});