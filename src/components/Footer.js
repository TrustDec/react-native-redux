import { View } from 'react-native';
import FilterLink from "../containers/FilterLink";
export default const Footer = () => {
    <View>
        Show:{" "}
        <FilterLink filter="SHOW_ALL">
            All
        </FilterLink>
        {","}
        <FilterLink filter="SHOW_ACTIVE">
            Active
        </FilterLink>
        {","}
         <FilterLink filter="SHOW_COMPLETED">
            completed
        </FilterLink>
    </View>
}