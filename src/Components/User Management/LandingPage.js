import React from 'react';
import {Link} from "react-router-dom";

const LandingPage = () => {
    return (
        <div className={"landing-page-wrapper"}>
            <div className={"title"}>
                <h1 className={"page-header"}>Welcome to hospital management</h1>
            </div>

            <div className={"buttons"}>
                <Link className="btn register-btn" to="/register">Register user</Link>

                <Link className="btn login-btn" to="/login">login user</Link>
            </div>
        </div>
    );
};

export default LandingPage;