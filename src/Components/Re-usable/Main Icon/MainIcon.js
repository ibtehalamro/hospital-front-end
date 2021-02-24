import React from 'react';
import {Link} from "react-router-dom";

const MainIcon = () => {
    return (
        <Link to={`/dashboard`} className="main-icon">
            <img src={process.env.PUBLIC_URL+`/assets/icons/main-icon.svg`} alt={`Main Application Icon`}/>
        </Link>
    );
};

export default MainIcon;