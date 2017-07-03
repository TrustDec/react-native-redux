import React, { Component } from 'react';
'use strict';
import ReactNative from 'react-native';
import { StackNavigator } from 'react-navigation';
import createInvoke from 'react-native-webview-invoke/native';
const {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Animated,
    Easing,
    WebView,
    Alert
} = ReactNative
 class HomeContent extends Component {
    static navigationOptions = {
        headerTitle: 'Home',
        tabBarVisible: true,
        headerTitleStyle:{ alignSelf:'center',color:'#fff'},
        headerStyle:{backgroundColor:'#2C3E51'},
    }
    componentWillMount(){
        this.animatedValue = new Animated.Value(100);
    }
    componentDidMount(){
        this.startViewAnimated();
    }
    startViewAnimated = () => {
        setTimeout(()=>{
            Animated.timing(this.animatedValue,{
                toValue: 20,
                duration: 3000,
                exsing:Easing.bounce
            }).start();
        },3000);
    }
    render(){
        const animatedStyle = { height:this.animatedValue };
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <Animated.View style={[styles.box,animatedStyle]}/>
                <Button
                    onPress={() => navigate('HomeOnePage',{user:[1,2,3,4,5,6]})}
                    title="进入子页面"
                />
            </View>
        );
    }
} 
class HomeNewPage extends Component {
    webview: WebView
    invoke = createInvoke(() => this.webview)
    constructor(props) {
        super(props);
        this.state = {
            url: "http://reactnative.cn/",
            url1:"http://192.168.1.101/redux/index.html"
        }
    }
    static navigationOptions = ({navigation}) => ({
        headerTitle: "HomeNewPage",
        tabBarVisible: false,
        headerTitleStyle:{ alignSelf:'center',color:'#fff'},
        headerStyle:{backgroundColor:'#2C3E51'},
    })
    componentDidMount() {
        this.invoke
            .define('Alert', this.ShowAlert)
    }
    ShowAlert = (title,content) => {
        Alert.alert(title, content, [{text: `确定${Date.parse(new Date())}`}]);
    }
    injectJavaScriptFn = () => {
        if (this.state.url===this.state.url1) {
            this.setState({url:"http://reactnative.cn/"})
            return
        }
        this.setState({url:this.state.url1})
    }
  render() {
    const { params } = this.props.navigation.state;
    // const html = `document.body.style.background = 'red';`;
    const html = `document.body.style.background = '#ccc'`;
    return (
        <View style={{flex:1}}>
        <Text onPress={()=>this.webview.injectJavaScript(this.injectJavaScriptFn())} style={{height:40,width:100,backgroundColor:'red'}}> akosd</Text>
        <WebView 
            ref={w => this.webview = w}
            automaticallyAdjustContentInsets={true}
            //injectJavaScript={()=>console.log(1)}
            injectedJavaScript={html}
            onShouldStartLoadWithRequest={()=> true}
            onMessage={this.invoke.listener}
            onError={()=>console.log("加载失败时调用")}
            onLoad={()=>console.log("加载成功时调用。")}
            onLoadStart={()=>console.log("加载开始时调用。")}
            source={{uri:this.state.url}}
            renderError={()=>{
                return <View style={{flex:1}}><Text>加载失败时显示</Text></View>
            }}
            renderLoading={()=>{
                return <Text>加载中。。。。</Text>
            }}
            scrollEnabled={true}
            style={styles.container}
            domStorageEnabled
            javaScriptEnabled
            startInLoadingState
            dataDetectorTypes="none"
            scalesPageToFit={true}
        />
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

export default  Home = StackNavigator({
  Home: { screen: HomeContent },
  HomeOnePage: { screen: HomeNewPage },
});