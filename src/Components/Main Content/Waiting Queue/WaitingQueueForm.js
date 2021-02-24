import React, {useLayoutEffect} from 'react';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router";
import {getFullName} from "../../../Common Functions/PersonFunctions";
import {postPatientToQueueService} from "./Waiting Queue Logic/WaitingQueueServices";
import {waitingQueueURLs} from "../../../Constants/URLConstants";

function WaitingQueueForm({patient, clinics, employees}) {
    let history = useHistory();
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = async (data) => {
       const res= await postPatientToQueueService({
            clinic: data.clinicName,
            patient: {id: patient.id},
            patientFullName: getFullName(patient.person.personName),
            employee: {id: data.employee}
        });

       if(res.status===201){
           history.push(waitingQueueURLs.waitingQueueList)

       }
    }

    return (
        <div className="waiting-queue-form-wrapper">

            <h3 className="text-center text-info">Add patient to waiting queue</h3>
            <p className="text-secondary">
                Patient ID : {patient.id}
            </p>
            <div className="d-inline">
                <h3>Patient Name</h3>
                <h4>{getFullName(patient.person.personName)}</h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                    <label htmlFor="clinicName">Select clinic</label>
                    <select className="form-control" id="clinicName" name="clinicName" ref={register}>
                        {clinics.map(item => (
                            <option key={item.id} value={item.clinicName}>
                                {item.clinicName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="employee">Select Employee</label>
                    <select className="form-control" id="employee" name="employee" ref={register}>
                        {employees.map(item => {
                                const name = item.person.personName;
                                return <option key={item.id} value={item.id}>
                                    {name.firstName + " " + name.parentName + " " + name.grandName + " " + name.familyName}
                                </option>
                            }
                        )}
                    </select>
                </div>
                <input type="submit"/>
            </form>
        </div>
    );
}

export default WaitingQueueForm;