import React, {useLayoutEffect, useState} from 'react';
import ClinicForm from "./ClinicForm";
import ClinicsTable from "./ClinicsTable";
import {getAllClinicsService, getClinicService} from "./Clinics Functions/ClinicsServices";
import {useParams} from "react-router";

const Clinic = (props) => {
    let {id: clinicId} = useParams()

    const [clinics, setClinics] = useState([]);
    const [clinic, setClinic] = useState([]);

    const getClinic = async () => {
        try {
            const res = await getClinicService(clinicId);
            setClinic(res)
        } catch (e) {
        }
    }
    const getAllClinics = async () => {
        setClinics(await getAllClinicsService());
        if (clinicId !== undefined) {//if the id is found in the url
            await getClinic()
        }
    }

    useLayoutEffect(() => {
        let mounted = true
        if (mounted)
            getAllClinics()
        return () => {
            mounted = false
        }
    }, [props.match])


    return (
        <div className="clinics-wrapper">
            <ClinicForm clinic={clinicId === undefined ? undefined : clinic}/>
            <ClinicsTable clinics={clinics}/>
        </div>
    );
};

export default Clinic;