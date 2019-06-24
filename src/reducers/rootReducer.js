const initState = {
    citySelected : "toronto"
}

const rootReducer = (state = initState, action) => {
switch(action.type){
    case "SHOW_RESTAURANTS":
        return {
            ...state,
            citySelected: action.citySelected
        }      
    default:  
        return state
    }  
   
}

export default rootReducer; 