import React, {useLayoutEffect, useState} from 'react';
import {getAllClinicsService} from "../Clinics Components/Clinics Functions/ClinicsServices";
import WaitingQueueForm from "./WaitingQueueForm";
import {getEmployeesListService} from "../Employee/Employee Logic/EmployeeServices";
import {getAllQueuesService} from "./Waiting Queue Logic/WaitingQueueServices";

const WaitingQueueMain = (props) => {

    const [clinics, setClinics] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(1);
    const [waitingQueue, setWaitingQueue] = useState([])

    const fetchData = async () => {
        setLoading(false)
        setClinics(await getAllClinicsService());
        const res = await getEmployeesListService();
        setEmployees(res.content);
        setTotalPages(res.totalPages);
        setWaitingQueue(await getAllQueuesService())
        setLoading(true)
        console.log("clinic", clinics)
    }

    useLayoutEffect(() => {
        fetchData()
    }, [])


    return (
        <div className="waiting-queue-wrapper">
            {loading &&
            <WaitingQueueForm employees={employees} clinics={clinics} patient={props.location.state.patient}/>
            }
        </div>
    );
};

export default WaitingQueueMain;