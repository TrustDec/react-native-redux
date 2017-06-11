import { View } from 'react-native';
import Todo from "./Todo";

const Todolist = ({todos, onTodoClick}) => {
    <View>
        {
            todos.map(todo=>{
                <Todo
                    key={todo.id}
                    {...todo}
                    onPress={()=>onTodoClick(todo.id)}
                />
            });
        }
    </View>
};