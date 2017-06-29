import React, { Component } from 'react';
import ReactNative from 'react-native';
import { StackNavigator } from 'react-navigation';
const {
    StyleSheet,
    View,
    Text,
    Animated,
    Image,
    TouchableWithoutFeedback,
    Dimensions,
    ScrollView
} = ReactNative;
const { width, height } = Dimensions.get('window'); 
const Images = [
    {image: require('../../../images/b1.jpg'),title: "b1"},
    {image: require('../../../images/b2.jpg'),title: "b2"},
    {image: require('../../../images/b3.jpg'),title: "b3"},
    {image: require('../../../images/b4.jpg'),title: "b4"},
];
const getInterpolate = (animatedScroll, i, imageLength) => {
    const inputRange =[
        (i - 1)* width,
        i * width,
        (i + 1)* width
    ]
    const outputRange = i === 0 ? [0, 0, 150] : [-300, 0, 150];
    return animatedScroll.interpolate({
        inputRange,
        outputRange,
        extrapolate: "clamp"
    });
};
const getSeparator = (i) => {
    return <View
        key={i}
        style={[styles.separate,{left:(i - 1) * width -2.5 }]}
    />
}
export default class HorizontalParallax extends Component {
    static navigationOptions = {
        headerTitle: 'A horizontal parallax scrollview',
        tabBarVisible: false,
        headerTitleStyle:{ alignSelf:'center',color:'#fff'},
        headerStyle:{ backgroundColor:'#2C3E51' },
    }
    constructor(props){
        super(props);
        this.state = {
            animatedScroll: new Animated.Value(0),
            scrollEnabled: true
        }
        this.handleFocus = this.handleFocus.bind(this);
    }
    handleFocus(focused){
        this.setState({
            scrollEnabled: !focused
        });
    }
    render(){
        return(
            <View style={styles.container_one}>
                <ScrollView
                    pagingEnabled
                    horizontal
                    scrollEnabled={this.state.scrollEnabled}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{
                            nativeEvent: {
                                contentOffset: {
                                    x: this.state.animatedScroll
                                }
                            }
                        }]
                    )}
                >
                    {
                        Images.map((image,i)=>{
                            return <Moment 
                                key={i} 
                                {...image}
                                translateX={getInterpolate(this.state.animatedScroll, i, Images.length)}
                                onFocus={this.handleFocus}
                                focused={this.state.scrollEnabled}
                            />
                        })
                    }
                    { Array.apply(null, { length: Images.length + 1 }).map((_, i) => getSeparator(i)) }
                </ScrollView>
            </View>
        );
    }
}
class Moment extends Component {
    constructor(props){
        super(props);
        this.state = {
            scale: new Animated.Value(1)
        }

    }
    componentWillMount(){
        this.bgFadeIntterpolate = this.state.scale.interpolate({
            inputRange: [.9,1],
            outputRange: ['rgba(0,0,0,.3)','rgba(0,0,0,0)']
        });
        this.textFade = this.state.scale.interpolate({
            inputRange: [.9, 1],
            outputRange: [0, 1]
        });
        this.calloutTranslate = this.state.scale.interpolate({
            inputRange: [.9, 1],
            outputRange: [0, 150]
        });
    }
    handlePress = () => {

        if (this.props.focused) {
            Animated.timing(this.state.scale,{
                toValue: 1,
                duration: 300
            }).start(()=> this.props.onFocus(true));
            return
        }
        Animated.timing(this.state.scale,{
            toValue: .9,
            duration: 300
        }).start(()=> this.props.onFocus(false));
    }
    render(){
        const animatedStyle = {
            transform: [
                { translateX: this.props.translateX },
                { scale: this.state.scale }
            ]
        }

        const bgFadeStyle = {
            backgroundColor: this.bgFadeIntterpolate
        }
        const textFadeStyle = {
            opacity: this.textFade
        }
        const calloutStyle = {
            transform: [{ translateY: this.calloutTranslate }]
        }
        return(
            <View style={styles.container}>
                    <Animated.Image
                        source={this.props.image}
                        style={[styles.image,animatedStyle]}
                        resizeMode="cover"
                    />
                    <TouchableWithoutFeedback onPress={this.handlePress}>
                        <Animated.View style={[StyleSheet.absoluteFill,styles.center,bgFadeStyle]}>
                            <Animated.View style={[styles.textWrap,textFadeStyle]}>
                                <Text style={styles.title}>{this.props.title}</Text>
                            </Animated.View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <Animated.View style={[styles.callout,calloutStyle]}>
                        <View>
                            <Text style={styles.title}>{this.props.title}</Text>
                        </View>
                    </Animated.View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container_one:{
        flex:1,
        backgroundColor:"#333"
    },
    separate: {
        backgroundColor:'#000',
        position:'absolute',
        top:0,
        bottom:0,
        width:5
    },
     container:{
        width,
        height,
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        width: null,
        height: null,
    },
    center: {
        justifyContent: "center"
    },
    textWrap: {
        backgroundColor: "rgba(rgba(0,0,0,0.5))",
        paddingVertical:10
    },
    title: {
        backgroundColor:"transparent",
        fontSize:30,
        color:'#fff',
        textAlign:'center'
    },
    callout: {
        height: 150,
        backgroundColor: "rgba(0,0,0,.5)",
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0
    }
});