import { connect } from "react-redux";
import Link from "../components/Link";
const mapStateToProps = (state) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
}
const mapDispatchToprops = (dispatch,ownProps)=> {
    return {
        onPress: () => {
            dispatch(setVisibility(ownProps.filter))
        }
    }
}
const FilterLink = connect(
        mapStateToProps,
        mapDispatchToprops
    )(Link);