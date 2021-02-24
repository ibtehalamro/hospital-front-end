import {GET_ERRORS, SET_BACKEND_NOT_REACHED, SET_CURRENT_USER, SET_INVLAID_USER_RESPONSE} from "../Types/Types";
import apiURL from "../../Components/Re-usable/Api Url/apiURL";
import jwt_decode from "jwt-decode";
import setJWTToken from "../../Components/User Management/Security/setJWTToken";
import {errorHandler} from "../../Errors/ErrorHandler";


export const createNewUser = (newUser, history) => async dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: {}
    });
    try {
        await apiURL.post("/api/users/register", newUser);
        history.push("/login");

        console.log("User registration")
    } catch (error) {
        if (error.response) {
            // Request made and server responded
            dispatch({
                type: SET_INVLAID_USER_RESPONSE,
                payload: error.response.data.message
            });
        } else if (error.request) {

            dispatch({
                type: SET_BACKEND_NOT_REACHED,
                payload: "backend not reached"
            });
            history.push("/*")

        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error from copy', error.message);
        }


    }
};


export const login = (LoginRequest,history) => async dispatch => {
    try {
        // post => Login Request
        const res = await apiURL.post("/api/users/login", LoginRequest);
        // extract token from res.data
        const {token} = res.data;
        // store the token in the localStorage
        localStorage.setItem("jwtToken", token);
        // set our token in header ***
        setJWTToken(token);
        // decode token on React
        const decoded = jwt_decode(token);
        console.log("decoded token", decoded)
        // dispatch to our securityReducer
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });
    } catch (error) {
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            dispatch({
                type: SET_INVLAID_USER_RESPONSE,
                payload: error.response.data
            });
            history.push("/login")

        } else if (error.request) {
            // The request was made but no response was received
            // console.log(error.request);
            dispatch({
                type: SET_BACKEND_NOT_REACHED,
                payload: "backend not reached"
            });
            history.push("/*")

        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error from copy', error.message);
        }


    }
};

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });

};
