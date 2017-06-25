import React, { Component } from 'react';
import ReactNative from 'react-native';
import { StackNavigator } from 'react-navigation';
const {
    StyleSheet,
    View,
    Animated,
    TouchableWithoutFeedback
} = ReactNative;
const gettransformationAnimation = (animation,scale,y,x,rotate,opacity) => {
    const scaleAnimation = animation.interpolate({
        inputRange:[0,1],
        outputRange:[0,scale]
    })
    const xAnimation = animation.interpolate({
        inputRange: [0,1],
        outputRange: [0,x]
    });
     const yAnimation = animation.interpolate({
        inputRange: [0,1],
        outputRange: [0,y]
    });
    const rotateAnimation = animation.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg',rotate]
    });
    const opacityAnimation = animation.interpolate({
        inputRange: [0,1],
        outputRange: [0,opacity]
    });
    return {
        opacity: opacityAnimation,
        transform: [
            { scale:scaleAnimation },
            { translateX:xAnimation },
            { translateY:yAnimation },
            { rotate:rotateAnimation }
        ]
    }
};
export default class ExplodingHeartButton extends Component {
    static navigationOptions = {
        headerTitle: 'A horizontal parallax scrollview',
        tabBarVisible: false,
        headerTitleStyle:{ alignSelf:'center',color:'#fff'},
        headerStyle:{ backgroundColor:'#2C3E51' },
    }
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            scale: new Animated.Value(0),
            animations: [
                new Animated.Value(0),
                new Animated.Value(0),
                new Animated.Value(0),
                new Animated.Value(0),
                new Animated.Value(0),
                new Animated.Value(0),
            ]
        }
        this.triggerLike = this.triggerLike.bind(this);
    }
    triggerLike() {
        this.setState({
            liked: !this.state.liked
        });
        const showAnimations = this.state.animations.map(animation=>{
            return Animated.spring(animation,{
                toValue:1,
                friction:4
            });
        });
        const hideAnimations = this.state.animations.map(animation=>{
            return Animated.timing(animation,{
                toValue:0,
                duration:50
            });
        }).reverse();
        Animated.parallel([
            Animated.spring(this.state.scale,{
                toValue: 2,
                friction: 3
            }),
            Animated.sequence([
                Animated.stagger(50,showAnimations),
                Animated.delay(100),
                Animated.stagger(50,hideAnimations),
            ]),
        ]).start(()=>{
            this.state.scale.setValue(0)
        });

    }
    render(){
        const bouncyHeart = this.state.scale.interpolate({
            inputRange: [0,1,2],
            outputRange: [1,.6,1]
        })
        const heartButtonStyle = {
            transform: [
                { scale: bouncyHeart }
            ]
        }
        return(
            <View style={styles.container}>
                <View>
                    <Heart filled style={[styles.heartBox,gettransformationAnimation(this.state.animations[5],.4,-280,0,"10deg",.7)]}/>
                    <Heart filled style={[styles.heartBox,gettransformationAnimation(this.state.animations[4],.7,-120,40,"45deg",.5)]}/>
                    <Heart filled style={[styles.heartBox,gettransformationAnimation(this.state.animations[3],.8,-120,-40,"-45deg",.3)]}/>
                    <Heart filled style={[styles.heartBox,gettransformationAnimation(this.state.animations[2],.3,-150,120,"-35deg",.6)]}/>
                    <Heart filled style={[styles.heartBox,gettransformationAnimation(this.state.animations[1],.3,-120,-120,"-35deg",.7)]}/>
                    <Heart filled style={[styles.heartBox,gettransformationAnimation(this.state.animations[0],.8,-60,0,"35deg",.8)]}/>
                    <TouchableWithoutFeedback onPress={this.triggerLike}>
                        <Animated.View style={heartButtonStyle}>
                            <Heart filled={this.state.liked}/>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}
const Heart = ({filled, style, ...props}) => {
    const centerNonFilled = (
        <View style={[StyleSheet.absoluteFill,styles.fit]}>
            <View style={[styles.leftHeart,styles.heartShape,styles.empty]}></View>
            <View style={[styles.rightHeart,styles.heartShape,styles.empty]}></View>
        </View>
    )
    const fillStyle = filled ? styles.filledHeart : styles.empty;
    return (
        <Animated.View { ...props } style={[styles.heart,style]}>
            <View style={[styles.leftHeart,styles.heartShape,fillStyle]}></View>
            <View style={[styles.rightHeart,styles.heartShape,fillStyle]}></View>
            {!filled && centerNonFilled}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    heartBox:{
        position:'absolute',
        top:0,
        left:0
    },
    heart: {
        width: 50,
        height: 50,
        backgroundColor: 'transparent'
    },
    heartShape: {
        width: 30,
        height: 45,
        position: 'absolute',
        top: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    filledHeart: {
        backgroundColor: '#e31745',
    },
    fit: {
        transform: [
            {scale: .9}
        ],
    },
    emptyFill: {
        backgroundColor: '#fff'
    },
    empty:{
        backgroundColor: '#ccc'
    },
    leftHeart: {
        transform: [
            { rotate: '-45deg' }
        ],
        left: 5
    },
    rightHeart: {
        transform:[
            { rotate:'45deg' }
        ],
        right:5
    }
});