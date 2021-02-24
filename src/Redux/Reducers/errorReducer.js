import {GET_ERRORS, SET_BACKEND_NOT_REACHED, SET_INVLAID_USER_RESPONSE} from "../Types/Types";


const initialState = {};


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            console.log("ERROR reducers")
            return {
                 ...action.payload
            };

            case SET_INVLAID_USER_RESPONSE:
            return {
                ...state,
                invalidUser: action.payload
            };
            case SET_BACKEND_NOT_REACHED:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}