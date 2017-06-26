import React, { Component } from 'react';
import ReactNative from 'react-native';
import { StackNavigator } from 'react-navigation';
const {
    StyleSheet,
    View,
    Text,
    Animated,
    TouchableOpacity
} = ReactNative;
const getTransformStyle = (animation) => {
    return {
        transform: [
            {translateY:animation}
        ]
    }
}
export default class FloatingButton extends Component {
    static navigationOptions = {
        headerTitle: 'A floating action button springy menu',
        tabBarVisible: false,
        headerTitleStyle:{ alignSelf:'center',color:'#fff'},
        headerStyle:{ backgroundColor:'#2C3E51' },
    }
    constructor(props) {
        super(props);
        this.state = {
            animated: new Animated.Value(0),
            fabs: [
                new Animated.Value(0),
                new Animated.Value(0),
                new Animated.Value(0)
            ]
        }
        this.open = false;
        this.handlePress = this.handlePress.bind(this);
    }
    handlePress = () => {
        const toValue = this.open ? 0 : 1;
        const flyouts = this.state.fabs.map((value,i)=>{
            return Animated.spring(value,{
                toValue: (i + 1) * -90 * toValue,
                friction: 5
            })
        });
        Animated.parallel([
            Animated.timing(this.state.animated,{
                toValue,
                duration: 300
            }),
            Animated.stagger(30,flyouts)
        ]).start();
        this.open = !this.open;
    }
    render(){
        const backgroundInterpolate = this.state.animated.interpolate({
            inputRange:[0,1],
            outputRange:['rgb(255,255,179)','rgb(0,99,0)']
        });
        const backgroundStyle = {
            backgroundColor: backgroundInterpolate
        };
        const buttonColorInterpolate = this.state.animated.interpolate({
            inputRange:[0,1],
            outputRange:['rgb(127,127,127)','rgb(204,204,204)']
        });
        const buttonRoutate = this.state.animated.interpolate({
            inputRange:[0,1],
            outputRange:['0deg','135deg']
        });
        const buttonStyle = {
            backgroundColor: buttonColorInterpolate,
            transform: [
                {rotate: buttonRoutate}
            ]
        };
        return(
            <Animated.View style={[styles.container,backgroundStyle]}>
                <View style={styles.position}>
                    {
                        this.state.fabs.map((animation,i)=>{
                            return <TouchableOpacity
                                key={i}
                                style={[styles.button,styles.fab,styles.flyout,getTransformStyle(animation)]}
                                onPress={this.handlePress}
                            />
                        })
                    }
                    <TouchableOpacity onPress={this.handlePress}>
                        <Animated.View style={[styles.button,buttonStyle]}>
                            <Text style={styles.plus}>+</Text>
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    position: {
        position: "absolute",
        right: 45,
        bottom: 45
    },
    fab: {
        position: 'absolute',
        bottom: 0,
        right:0
    },
    button: {
        width:60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flyout: {
        backgroundColor:'#66CCFF'
    },
    plus: {
        fontWeight: 'bold',
        fontSize: 30,
        color: "#00768f"
    }
});
console.disableYellowBox = true;