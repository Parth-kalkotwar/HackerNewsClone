const initState = {
    search: '',
    loggedIn: false
}
const rootReducer = (state = initState,action) => {
    if(action.type==='ChangeSearchField') {
        return {
            ...state,
            search:action.text
        }
    }
    else if(action.type === "logIn") {
        console.log("Logged In")
        return {
            ...state,
            loggedIn: true
        }
    }
    return state
}

export default rootReducer