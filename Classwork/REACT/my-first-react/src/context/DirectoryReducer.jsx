import { ADD_CONTACT, FILTER, LOGIN, LOGOUT } from "./actions";

function DirectoryReducer(state, action){
    switch(action.type){
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            };
        case FILTER:
            return{
                ...state,
                filter: action.payload
            }
        default:
            throw new Error(`Unsupported action ${action.type}`);
    }
}

export default DirectoryReducer;