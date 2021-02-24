import React from 'react';
import {useSelector} from "react-redux";

const BackendNotFoundError = () => {
    const error=useSelector(state => state.errors.errors)
    console.log("error",error)
    return (
        <div>
            <h1>Error message : {props.message}</h1>
        </div>
    );
};

export default BackendNotFoundError;