const Todo = (state,action) => {
    switch (action.type){
        case "ADD_TODO":
            return {
                id: action.id,
                text: action.text,
                completed: false,
            }
        case "TOGGLE_TODO":
            if (state.id !== action.id ) {
                return state
            }
            // Object.assign是ES6新方法：是把state与{ completed: !state.completed }进行合并到第一个 {} 对象里面
            return Object.assign({},state,{
                completed: !state.completed
            });
        default:
            return state
    }
}
export default const Todos = (state,action) => {
    switch (action.type){
        case "ADD_TODO":
            return [
                ...state,
                todo(undefined,action)
            ]
        case "TOGGLE_TODO":
            return state.map(t=>Todo(t,action));
        default:
            return state
    }
}