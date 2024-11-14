import { ADD_CONTACT, FILTER, LOGIN, LOGOUT } from "./actions";

function DirectoryReducer(state, action){
    switch(action.type){
        case ADD_CONTACT:
            break;
        case FILTER:
            break;
        default:
            throw new Error(`Unsupported action ${action.type}`);
    }
}