import React,{useLayoutEffect, useState} from 'react';
 import {getAllClinicsService} from "../Clinics Components/Clinics Functions/ClinicsServices";
import {getPatientsCountService} from "./DashboardServices/DashboardServices";

const Dashboard = () => {

    const [patientsCount,setPatientCount]=useState(0);

    const getPatientsCount = async () => {
        setPatientCount(await getPatientsCountService());

    }

    useLayoutEffect(() => {
        let mounted = true
        if (mounted)
            getPatientsCount()

        return () => {
            mounted = false
        }
    }, [])

    return (
        <div>

            <h1>Dashboard</h1>
            <h1>patient count : {patientsCount}</h1>
        </div>
    );
};

export default Dashboard;