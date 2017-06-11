import { combineReducers } from "redux";
import Todos from "./todo";
import VisibityFilter from './visibityFilter';
//console.log(Todos,VisibityFilter);
export default const TodoApp = combineReducers({
    Todos,
    VisibityFilter
});