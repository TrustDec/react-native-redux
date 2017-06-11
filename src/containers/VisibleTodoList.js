import { View,Text,TextInput } from 'react-native';
import { toggleTodo } from "../actions";
import { connect } from "react-redux";
import TodoList from "../components/TodoList";
const getVisibleTodos = () => {
    switch(filter){
        case "SHOW_ALL":
            return todos
        case "SHOW_COMPLETED":
            return todos.filter(t.completed)
        case "SHOW_ACTIVE":
            return todos.filter(t => !t.completed)
    }
}
const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter);
    }
}
const mapDispatchToprops = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(tooggleTodo(id));
        }
    }
}
const VisibleTodoList = connect(
        mapStateToProps,
        mapDispatchToprops
    )(TodoList);