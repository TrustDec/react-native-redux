import React, { Component } from 'react';
import ReactNative from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
const {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Animated,
    ScrollView
} = ReactNative
let img = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498159716241&di=07db5f36897d5a71e4d44b2afcb0693a&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fapp%2Ficon%2F20161013%2F1476340374780065.jpg';

export default class CollapsibleHeaderBar extends Component {
    static navigationOptions = {
        headerTitle: 'A collapsible header bar',
        tabBarVisible: false,
        headerTitleStyle:{ alignSelf:'center',color:'#fff'},
        headerStyle:{backgroundColor:'#2C3E51'},
    }
    componentWillMount(){
        this.animated = new Animated.Value(0);
    }
    //inputRange
    render(){
        const hideImageInterpolate = this.animated.interpolate({
            inputRange: [0, 150],
            outputRange: [30, 0],
            extrapolate: "clamp",
        });
        const fontInterpolate = this.animated.interpolate({
            inputRange: [0, 150],
            outputRange: [24, 30],
        });
        const opacityInterpolate = this.animated.interpolate({
            inputRange: [0, 150],
            outputRange: [1, 0],
        });
        const collapseInterpolate = this.animated.interpolate({
            inputRange: [0, 150],
            outputRange: [50, 0],
            extrapolate: "clamp",
        });
        const imageStyle = {
            width: hideImageInterpolate,
            height: hideImageInterpolate
        };
        const fontStyle = {
            fontSize: fontInterpolate
        };
        const fadeButtonStyle = {
            opacity: opacityInterpolate,
            height: collapseInterpolate
        }
        return(
            <View>
                <View style={styles.container}>
                    <Animated.Image source={{uri:img}} style={[styles.image,imageStyle]}/>
                    <Animated.Text style={[styles.titleStyle,fontStyle]}>Egghead</Animated.Text>
                    <Animated.View style={[styles.buttons,fadeButtonStyle]}>
                        <View style={styles.button}>
                            <Text>Button 1</Text>
                        </View>
                        <View style={styles.button}>
                            <Text>Button 2</Text>
                        </View>
                    </Animated.View>
                </View>
                <View style={styles.scrollView}>
                    <ScrollView
                        style={{flex:1,backgroundColor:'green'}}
                        scrollEventThrottle={16}
                        onScroll={Animated.event([
                            { nativeEvent: { contentOffset:{y: this.animated } } }
                        ])}
                    >
                        <View style={styles.fakeContent}>
                            <Text style={styles.fakeText}>Top</Text>
                        </View>
                    </ScrollView>
               </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
         //flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    image:{
        width:10,
        height:10,
        justifyContent:'center',
        alignItems:'center',
    },
    titleStyle:{
        textAlign:'center'
    },
    buttons:{
        flexDirection:'row'
    },
    button:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    scrollView:{
        width:'100%',
        height:500,
        backgroundColor:'#188eee'
    },
    fakeContent:{
        justifyContent:'center',
        alignItems:'center',
    },
    fakeText:{
        color:'#fff',
        fontSize:17
    },
});