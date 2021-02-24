import React from 'react';
import {Link} from "react-router-dom";
import {clinicsURLs as clinicsURL} from "../../../Constants/URLConstants";

const ClinicCard = ({clinic, deleteClinicMethod}) => {
    return (
        <div className={"clinic-card-wrapper"}>
            <h2 className={"clinic-id"}>{clinic.id}</h2>
            <h2 className={"clinic-name"}>{clinic.clinicName}</h2>

            <div className={"clinic-card-buttons"}>
                <Link className="small-button edit-button round-edge-button"
                      to={`${clinicsURL.clinic}/${clinicsURL.clinics}/${clinic.id}`}>Edit
                </Link>

                <Link onClick={async () => {
                  await  deleteClinicMethod(clinic.id)
                }} className="small-button delete-button round-edge-button"
                      to={``}>delete
                </Link>
            </div>
        </div>
    );
};

export default ClinicCard;