import React, { Component } from 'react';
import ReactNative from 'react-native';
import { StackNavigator } from 'react-navigation';
const {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Animated,
    Easing
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
  static navigationOptions = ({navigation}) => ({
    headerTitle: "HomeNewPage",
    tabBarVisible: false,
    headerTitleStyle:{ alignSelf:'center',color:'#fff'},
    headerStyle:{backgroundColor:'#2C3E51'},
  });
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text>Home New page{params.user[2]}</Text>
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