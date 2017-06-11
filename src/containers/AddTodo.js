import { View,Text,TextInput } from 'react-native';
import { addTodo } from "../actions";
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
export default AddTodo