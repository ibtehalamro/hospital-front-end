import React from 'react';
import {Link} from "react-router-dom";
import {getFullName, getPersonAge} from "../../../../Common Functions/PersonFunctions";

const PatientBio = ({setPatientInfo,patient}) => {
     const {
        id,
        person: {personName: name, mobileNumber, village, dateOfBirth, gender,socialNumber},
    } = patient;


    return (
        <div className={'person-bio-wrapper'}>

            <div className="person-name-date">
                <h3 className={'fullName'}>{getFullName(name)}</h3>
                <h6 className={'date-of-birth'}>{dateOfBirth}</h6>
            </div>

            <div className={'edit-buttons'}>
                <Link className="edit-button small-button" to={'#'} onClick={()=>{setPatientInfo(false)}} >Edit</Link>
                <Link className="delete-button small-button" to={'#'}>Delete</Link>
            </div>

            <div className={'details'}>

                <div className={'line'}>

                    <h5>Age</h5>
                    <h5>{getPersonAge(dateOfBirth)}</h5>
                </div>
                <div className={'line'}>

                    <h5>Village</h5>
                    <h5>{village===null?"---":village}</h5>
                </div>
                <div className={'line'}>

                    <h5>Mobile Number</h5>
                    <h5>{mobileNumber}</h5>
                </div>
                <div className={'line'}>

                    <h5>Gender</h5>
                    <h5>{gender===true?"Female":"Male"}</h5>
                </div>
                <div className={'line'}>

                    <h5>Social Number</h5>
                    <h5>{socialNumber}</h5>
                </div>


            </div>
            {/*details*/}

            <div className={'allergies'}>

            </div>



        </div>
    );
};

export default PatientBio;