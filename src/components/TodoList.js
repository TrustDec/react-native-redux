import React, { Component, PropTypes } from 'react'
import { View,Text } from 'react-native';
//import Todo from "./Todo";
export default class Todolist extends Component {
    render(){
        return(
            <View style={{height:200,width:'100%'}}>
                {
                    this.props.todos.map((todo,index) => {
                        console.log(todo);
                        return <Text
                            key={index}
                            onPress={()=>this.props.onTodoClick(index)}
                            style={{
                                color: todo.completed ? 'red' : 'green',
                            }}>
                                {todo.text}
                        </Text>
                      
                    })
                }
            </View>
        )
    }
}
Todolist.propTypes = {
    onTodoClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
}
