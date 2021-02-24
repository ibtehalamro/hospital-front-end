import React from 'react';
import {Link} from "react-router-dom";
import {getFullName, getPersonAge} from "../../Common Functions/PersonFunctions";


// used to show information about one use only


const PersonCard = ({person,infoPageUrl}) => {
    const {
        id,
        person: {personName: name, mobileNumber, village, dateOfBirth, gender},

    } = person;


    // console.log("person", person);
    const icon = gender === true ? 'female' : 'male';
    return (
        <div className={'person-card-wrapper'}>
            <div className="icon-wrapper">
                {/*<img src={process.env.PUBLIC_URL + `/assets/icons/female.svg`} alt={`gender icon`}/>*/}
                <img src={  `/assets/icons/${icon}.svg`} alt={`gender icon`}/>
            </div>
            <div className="main">
                <h3 className="full-name">{getFullName(name)}</h3>
                <h5 className="mobile-number">{mobileNumber}</h5>
                <h5 className="last-visit">2 days ago</h5>
            </div>

            <div className="secondary">
                <div className="item">
                    <h4 className="person-age">Age:</h4>
                    <h4 className="person-age">{getPersonAge(dateOfBirth)}</h4>

                </div>
                <div className="item">
                    <h4 className="village">Village:</h4>
                    <h4 className="village">{village}</h4>

                </div>
                <div className="item">
                    <Link className={'more'} to={`${infoPageUrl}${id}`}>More</Link>
                </div>

            </div>
        </div>
    );
};

export default PersonCard;