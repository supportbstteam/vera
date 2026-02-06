const initialState = {
    open:false
}
export const searchReducer = (state = initialState, action)=>{
    switch(action.type){
        case "click" : return {...state, open:action.payload}        
        default: return state
    }
}


