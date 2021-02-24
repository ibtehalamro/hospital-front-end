import React, {useLayoutEffect, useState} from 'react';

import PersonCard from "../../Re-usable/PersonCard";
import {getPatientsListService} from "./Patient Logic/PatientServices";
import Pagination from "../../Re-usable/Pagination/Pagination";
import {patientURLS} from "../../../Constants/URLConstants";


function PatientListTable() {

    const [patient, setPatient] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const paginate = (pageNumber) => {
        console.log('pagination called')
        setCurrentPage(pageNumber)
        getPatientList(pageNumber, itemsPerPage)

    }

    const getPatientList = async (pageNumber, itemsPerPage) => {

        const res = await getPatientsListService(pageNumber, itemsPerPage)
        console.log("response get all patients",res)
        setTotalPages(res.data.totalPages)
        setPatient(res.data.content)
    }

    useLayoutEffect(() => {
        let mounted = true;
        if (mounted)
            getPatientList(0, itemsPerPage)

        return (() => {
            mounted = false;
        })
    }, [])


    return (

        <div className=" patient-table cards-table-wrapper">

            {
                patient && patient.length > 0 ?
                    patient.map((patient, index) => {
                        return <PersonCard key={index} person={patient} infoPageUrl={patientURLS.patientInfo}/>
                    })

                    : "no patients found"
            }

            <Pagination totalPages={totalPages} current={currentPage} paginate={paginate}/>

        </div>

    );
}

export default PatientListTable;
