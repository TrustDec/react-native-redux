import React, { Component } from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Test from '../page/mess/component/Test';
const { View,Text,StyleSheet,TouchableOpacity } = ReactNative;
export default class ListCase extends Component {
    onShowViewList(){
        return this.props.listdata.map((item,index)=>{
            console.log()
            return  <TouchableOpacity style={styles.container} key={index} activeOpacity={0.8} onPress={() => NavRoute.navigate('Test')}>
                        <Text style={styles.titleStyle}>{item.title}</Text>
                        <Icon style={styles.iconStyle} name={'ios-arrow-forward-outline'} size={25} color={'#ccc'} />
                    </TouchableOpacity>
        });
    }
    render(){
        return(
            <View>
                {this.onShowViewList()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        width:WIDTH,
        height:40,
        borderWidth:BorderMin,
        borderColor:'#ccc',
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    titleStyle: {
        fontSize: 14,
        color: '#aaa',
        flex:1,
        paddingLeft:20
    },
    iconStyle:{
        width:40
    }
});

