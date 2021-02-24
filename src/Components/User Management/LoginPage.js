import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {login} from "../../Redux/Actions/SecurityActions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import TextInputCustom from "../Re-usable/FormComponents/TextInputCustom";
import {messages, registerObjectNames} from "../../Common Functions/FormObjects";
import {GET_ERRORS} from "../../Redux/Types/Types";

const LoginPage = () => {
    const dispatch = useDispatch();

    const error=useSelector(state => state.errors.invalidUser)

    const state = useSelector(state => state.security)
    const history = useHistory()
    const {register, handleSubmit,setError, errors} = useForm({
        defaultValues: {
            "username": "mmn@aa.com",
            "password": "12345"
        }
    });

    function onSubmit(data) {

        dispatch(login(data,history))
    }

    useEffect(()=>{
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        if(error){
            setError("username",{"type":"invalid","message":"User name is invalid"})
            setError("password",{"type":"invalid","message":"password is invalid"})
        }
         },[error])

    useEffect(() => {
        if (state.validToken) {
            history.push("/dashboard")
        }
    }, [state])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInputCustom field="username" label="Email" errorMessages={messages}
                                 form={{register, errors, registerObject: registerObjectNames}}/>

                <TextInputCustom field="password" label="Password" errorMessages={messages}
                                 form={{register, errors, registerObject: registerObjectNames}}/>

                <input type="submit"/>
            </form>
        </div>
    );
};

export default LoginPage;