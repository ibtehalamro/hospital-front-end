import React from 'react';
import {useSelector} from "react-redux";


// TODO style this component
const ErrorComponent = (props) => {
    const error=useSelector(state => state.errors.error)
    console.log("error",error)

    if(error===undefined){
        return <div >
            <h1>Sorry we are unable to find your page</h1>
        </div>
    }

    return (
        <div>
            <h1>Error message : {error}</h1>
        </div>
    );
};

export default ErrorComponent;