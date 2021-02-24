import React from 'react';
import ClinicCard from "./ClinicCard";
import api from "../../Re-usable/Api Url/apiURL";
import {clinicsURLs as clinicsURL, webApiURL as webApiUrl} from "../../../Constants/URLConstants";
import {useHistory} from "react-router";

const ClinicsTable = ({clinics}) => {
    const history = useHistory();

    if (clinics.length === 0) {
        return <div className="clinicTable">
            <h2 className={"no-clinics"}>Please add clinics</h2>
        </div>
    }

    const deleteClinicMethod = async (clinicId) => {

        try {
            const res = await api.delete(webApiUrl.clinics.deleteClinic + clinicId);
            history.push(`${clinicsURL.clinic}/${clinicsURL.clinics}`)

        } catch (e) {

        }
    }
    return (
        <div className="clinicTable">
            {
                clinics.map(clinic => {
                    return <ClinicCard key={clinic.id} clinic={clinic} deleteClinicMethod={deleteClinicMethod}/>
                })
            }
        </div>
    );
};

export default ClinicsTable;