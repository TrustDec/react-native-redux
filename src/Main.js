import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppRegistry,View,Text } from 'react-native';
import Index from './page';
//import App from './components/App';
import todoApp from './reducers';
const store = createStore(todoApp);
export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Index/>
           </Provider>
        );
    }
}