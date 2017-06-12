import React, { Component, PropTypes } from 'react'
import { View,Text } from 'react-native';
//import FilterLink from "../containers/FilterLink";
export default class Footer extends Component {
    renderFilter(filter, name) {
        if (filter === this.props.filter) {
            return name
        }
        return (
            <Text href='#' onPress={ ()=> {
                this.props.onFilterChange(filter)
            }}>
                {name}
            </Text>
        )
    }
    render(){
        return(
            <View>
                <Text>Show:{" "}
                {this.renderFilter('SHOW_ALL', 'All')}{', '}
               {this.renderFilter('SHOW_COMPLETED', 'Completed')}{', '}
                {this.renderFilter('SHOW_ACTIVE', 'Active')}</Text>
            </View>
        );
    }
}

Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

{/*export default const Footer = () => {
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
}*/}