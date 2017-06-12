import React, { Component, PropTypes } from 'react'
import { View,Text,TextInput } from 'react-native';
export default class AddTodo extends Component {
  render() {
    return (
      <View style={{flexDirection:'row',width:'100%'}}>
        <TextInput ref={e=>this.input=e} style={{width:200,height: 40, borderColor: 'gray', borderWidth: 1}}/>
        <Text onPress={(e) => this.handleClick(e)}>
          Add
        </Text>
      </View>
    )
  }

  handleClick(e) {
    const text = this.input._lastNativeText.trim();
    this.props.onAddClick(text);
    this.input._lastNativeText="";
    // const node = this.refs.input
    // const text = node.value.trim()
    // this.props.onAddClick(text)
    // node.value = ''
  }
}

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
}
/*import { addTodo } from "../actions";
import { connect } from "react-redux";
let input;
function _onPress(dispatch){
    if (!input.value.trim()) return
    dispatch(addTodo(input.value));
    input.value = ""
}
let AddTodo = ({dispatch}) => {
    return (
        <View>
            <TextInput ref={ input => input = input}/>
            <Text onPress={()=>_onPress(dispatch)}>button</Text>
        </View>
    );
}
AddTodo = connect()(AddTodo)
export default AddTodo*/