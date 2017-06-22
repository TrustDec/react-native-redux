import React, { Component } from 'react';
import ReactNative from 'react-native';
import Swiper from '../../components/Swiper';
import Test from './component/Test';
import ListCase from '../../components/ListCase';
import { StackNavigator } from 'react-navigation';
const {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
} = ReactNative;
class MessContent extends Component {
    static navigationOptions = {
        headerTitle: 'MessContent',
        tabBarVisible: true,
        headerTitleStyle:{ alignSelf:'center',color:'#fff'},
        headerStyle:{backgroundColor:'#2C3E51'},
    }
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
                <View style={styles.container}>
                    <ListCase listdata={ListContent}/>
                </View>
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
const ListContent = [
    {
        title:"one",
        onPress:"Test"
    }
];
export default  Mess = StackNavigator({
    Mess: {screen: MessContent},
    Test: { screen: Test },
});
