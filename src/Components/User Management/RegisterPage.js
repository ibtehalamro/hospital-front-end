import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {createNewUser} from "../../Redux/Actions/SecurityActions";
import {useHistory} from "react-router";
import TextInputCustom from "../Re-usable/FormComponents/TextInputCustom";
import {messages, registerObjectNames} from "../../Common Functions/FormObjects";

const RegisterPage = () => {
    const state = useSelector(state => state.security)
    const history = useHistory()
    let [passwordsMustMatch, setPasswordsMustMatch] = useState("");
    const error=useSelector(state => state.errors.invalidUser)
    useEffect(() => {
        console.log("state", state)
        if (state.validToken) {
            history.push("/dashboard")
        }
    }, [state])
    const dispatch = useDispatch();

    const {register, handleSubmit,setError, errors} = useForm({
        defaultValues: {
            "username": "mmn@aa.com",
            "password": "12345",
            "fullName": "ibtehal",
            "confirmPassword": "12345"
        }
    });

    function onSubmit(data) {

        if (data.password === data.confirmPassword) {
            setPasswordsMustMatch("")
            dispatch(createNewUser(data, history))
        } else {
            setPasswordsMustMatch("Password and confirm password does not match")
        }

    }
    useEffect(()=>{
        if(error){
            setError("username",{"type":"invalid","message":error})
         }
    },[error])
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <TextInputCustom field="fullName" label="Name" errorMessages={messages}
                                 form={{register, errors, registerObject: registerObjectNames}}/>
                <TextInputCustom field="username" label="Email" errorMessages={messages}
                                 form={{register, errors, registerObject: registerObjectNames}}/>
                <TextInputCustom field="password" label="Password" errorMessages={messages}
                                 form={{register, errors, registerObject: registerObjectNames}}/>
                <TextInputCustom field="confirmPassword" label="Confirm password" errorMessages={messages}
                                 form={{register, errors, registerObject: registerObjectNames}}/>

                {
                    passwordsMustMatch.length > 0 ? <h3>{passwordsMustMatch}
                    </h3> : ""
                }
                <input type="submit"/>
            </form>
        </div>
    );
};

export default RegisterPage;