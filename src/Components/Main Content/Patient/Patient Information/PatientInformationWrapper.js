import React, {useEffect, useState} from 'react';

import PatientInvoices from "./PatientInvoices";
import PatientBio from "./PatientBio";
import PatientForm from "../Patient Forms/PatientForm";
import {getPatientInformationService} from "../Patient Logic/PatientServices";

const PatientInformationWrapper = (props) => {
    const id = props.match.params.id;
    const [patient, setPatient] = useState();
    const [invoices, setInvoices] = useState();
    const [patientInfo, setPatientInfo] = useState(true);
    useEffect(() => {
        console.log('PatientRouter Information **************************')
    })

    const getPatientInformation = async ( ) => {
        const res = await getPatientInformationService(id);
        console.log("response from info",res)
        let {patient,invoices}=res;
        setPatient(patient)
        setInvoices(invoices)
    }

    useEffect(() => {
        getPatientInformation();

    }, [props.location])  // fetch your data when the props.location changes


    return (<>
            {patientInfo === true ? <div className="person-information-wrapper">
                <div className="person-information-data-wrapper">

                    {
                        invoices === undefined ? "No available invoces" : <PatientInvoices invoices={invoices}/>
                    }
                </div>
                {patient === undefined ? "no patient" : <PatientBio setPatientInfo={setPatientInfo} patient={patient}/>}

            </div> : <PatientForm patient={patient}/>}

        </>
    );
};

export default PatientInformationWrapper;