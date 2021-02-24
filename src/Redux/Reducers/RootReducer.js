import {combineReducers} from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./SecurityReducer";


export default combineReducers({
    errors: errorReducer
    ,
    security: securityReducer

});