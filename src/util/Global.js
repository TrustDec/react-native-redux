import ReactNative from 'react-native';
import ActualPixel from '../components/ActualPixel';
const {Dimensions, StyleSheet, PixelRatio, Platform,StatusBar} = ReactNative;
let {height, width} = Dimensions.get('window');
// 获取屏幕宽度
global.WIDTH = width;
// 获取屏幕高度
global.HEIGHT = height;
// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();
// 系统是iOS
global.iOS = (Platform.OS === 'ios');
// 系统是安卓
global.Android = (Platform.OS === 'android');
// 系统版本
global.Version = Platform.Version;
// 适配字体
global.ActualPixel = ActualPixel;
// 最细的边
global.BorderMin = StyleSheet.hairlineWidth;
// 状态栏高度
global.SBarH = iOS?20:StatusBar.currentHeight;
// 主题颜色
global.THEMEBG = "#38393F";
// server url
//global.SERVER = "http://api.biaoxintong.com:8080/landing-craft/"; 

