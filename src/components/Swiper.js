import React, { Component } from 'react';
import ReactNative from 'react-native';
const {
    View,
    Text,
    Image,
    StyleSheet,
    Animated,
    PanResponder
} = ReactNative;
export default class Swiper extends Component {
    position = new Animated.Value(0); // 表示当前在那一页
    positionValue = 0;
    state = {
        width:null
    };
    constructor(props){
        super(props);
        this.position.addListener(v => {
            this.positionValue = v.value;
        });
    }
    responder = PanResponder.create({
        onStartShouldSetPanResponder:(evt,gestureState)=> false,
        onStartShouldSetPanResponderCapture:(evt,gestureState)=> false,
        onMoveShouldSetPanResponder: (evt,gestureState)=> true,
        onMoveShouldSetPanResponderCapture: (evt,gestureState)=> true,
        onShouldBlockNativeResponder: (evt, gestureState) => {
            // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
            // 默认返回true，目前暂时只支持android
            return true;
        },
        onPanResponderTerminationRequest: (evt, gestureState) => false,
        onPanResponderGrant: (evt, gestureState) => {
            this.position.setOffset(this.positionValue);
            this.position.setValue(0);
        },
        /*onPanResponderMove: Animated.event([
            null,{dx: this.value}
        ]),*/
        onPanResponderMove: (evt,{dx})=>{
            this.position.setValue(dx / -this.state.width)
        },
        onPanResponderRelease: (evt, {vx}) => {
            this.position.flattenOffset();
            const childrenCount = React.Children.count(this.props.children);
            //const left = Math.max(0,Math.floor(this.positionValue));
            const left = Math.floor(this.positionValue);
            const right = left + 1;
            let result;
            if (vx>0.05) {
                result = left;
            }else if(vx<0.05) {
                result = right;
            }else {
                result = Math.round(this.positionValue);
            }
            if (result < 0 ) {
                result += childrenCount;
                this.position.setValue(this.positionValue + childrenCount);
            }else if (result >= childrenCount) {
                result -= childrenCount;
                this.position.setValue(this.positionValue - childrenCount);
            }
            Animated.spring(this.position, {
                toValue: result,
            }).start();
        }
    });
    onLayout = (ev) => {
        const width = ev.nativeEvent.layout.width;
        if (width !== this.state.width) {
            this.setState({
                width
            });
        }
    }
    render(){
        const { style, children } = this.props;
        const { width } = this.state;
        if (!width) {
            <View style={[].concat(style,styles.container)} onLayout={this.onLayout}/>
        }
        const r = Math.sqrt(3) / 2 * width;
        return(
            <View 
                style={[].concat(style,styles.container)} 
                onLayout={this.onLayout}
                {...this.responder.panHandlers}
            >
                {
                    React.Children.map(children,( child, i ) => {
                        return (
                            <Animated.View key={i} style={[styles.item,{
                                transform:[
                                    /*{translateX:this.position.interpolate({
                                        inputRange: [i,i+1],
                                        outputRange: [0,-width],
                                    })},*/
                                    {perspective: 850 },
                                    {scale:0.6},
                                    // translateZ: r
                                    {rotateY:'90deg'},
                                    {translateX: r },
                                    {rotateY:'-90deg'},
                                    {rotateY:this.position.interpolate({
                                        inputRange: [i,i+1],
                                        outputRange: ['0deg','-60deg'],
                                    })},
                                    // translateZ: -r
                                    {rotateY:'-90deg'},
                                    {translateX:r},
                                    {rotateY:'90deg'},
                                ]
                            }]}>
                                {child}
                            </Animated.View>
                        )
                    })
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        //width:WIDTH,
        height:ActualPixel(120),
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    item:{
        position: 'absolute',
        top: 0,
        left: 0,
        right:0,
        bottom: 0,

    }
});