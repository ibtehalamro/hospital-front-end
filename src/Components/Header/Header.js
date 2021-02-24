import React, {useReducer} from 'react';
import HeaderItem from "./HeaderItem";
import MainIcon from "../Re-usable/Main Icon/MainIcon";
import {clinicsURLs as clinicsURL, employeeURLS, patientURLS, waitingQueueURLs} from "../../Constants/URLConstants";


const Header = () => {

    const [navbar, toggleNavbar] = useReducer((navbar, action) => {
        return !navbar
    }, false, undefined)
    const closeMobileMenu = () => toggleNavbar(true)


    return (
        <header className="header-wrapper">


                <div className={'icons'}>
                    <MainIcon/>
                    <div className="arrow-button"
                          onClick={() => {
                              toggleNavbar()
                          }}/>

                </div>

                <div className={` ${navbar ? "header-links hide" : "header-links"} `}>
                    <HeaderItem path={'/dashboard'} icon={'dashboard'} link={"Dashboard"} m={closeMobileMenu}/>
                    <HeaderItem path={`${patientURLS.patient}/${patientURLS.patientForm}`} icon={'hospital-patient'}
                                link={"Patient"} m={closeMobileMenu}/>
                    <HeaderItem path={`${employeeURLS.employee}/${employeeURLS.employeeForm}`} icon={'employee'}
                                link={"Employee"} m={closeMobileMenu}/>
                    <HeaderItem path={`${clinicsURL.clinic}/${clinicsURL.clinics}`} icon={'clinics'} link={"Clinics"}
                                m={closeMobileMenu}/>
                    <HeaderItem path={`${waitingQueueURLs.waitingQueue}/${waitingQueueURLs.waitingQueueList}`}
                                icon={'waitingQueue'} link={"Waiting Queue"} m={closeMobileMenu}/>
                </div>

        </header>
    );
};

export default Header;