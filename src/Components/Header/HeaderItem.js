import React from 'react';
import {NavLink} from "react-router-dom";

const HeaderItem = ({icon,link,path,m}) => {
    return (
        <NavLink to={`${path}`} className={'header-item'} onClick={m}>
             <img src={ `/assets/icons/${icon}.svg`} alt={``}/>
            <h4>{link}</h4>
        </NavLink>
    );
};

export default HeaderItem;