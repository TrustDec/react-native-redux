export default const VisibityFilter = (state="SHOW_ALL",action) => {
    switch (action.type){
        case "SET_VISIBILITY":
            return action.visibityFilter
        default:
            return state
    }
}