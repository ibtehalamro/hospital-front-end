import React, {useState} from 'react';
import TextInputCustom from "../../../Re-usable/FormComponents/TextInputCustom";
import {useForm} from "react-hook-form";
import {messages, registerObject} from "../../../../Common Functions/FormObjects";
import {findPatientsForm} from "../Patient Logic/PatientServices";
import {getPersonAge} from "../../../../Common Functions/PersonFunctions";
import {Link} from "react-router-dom";
import {waitingQueueURLs} from "../../../../Constants/URLConstants";


function FindPatient({onSubmit, onChange}) {

    const [patientsList, setPatientsList] = useState([])//result of searching the patient name stored here as array
    const [serverError, setServerError] = useState()//if there is server errors returned stored here


    const {register, errors, handleSubmit} = useForm();


    const onChangeName = async (e) => {

        setServerError("")
        if (e.target.value.length === 0) {
            setPatientsList([])
        }
        if (e.target.value.length > 0) {
            await findPatientsForm(e.target.value, setPatientsList, setServerError);
        }
        console.log("patientList", patientsList)

    };

     return (
        <div className="find-person-form-wrapper">

            <h3>Type the patient name then locate him in the bellow list</h3>
            <br/>

            <form className={"find-person-form"} onSubmit={handleSubmit(onSubmit)}>
                <TextInputCustom field="firstName" label="First Name" errorMessages={messages}
                                 form={{register, errors, registerObject}} onChange={onChangeName}/>
            </form>
            {serverError && <p className="font-weight-bold text-danger">{serverError.message}</p>}
            {patientsList !== undefined && patientsList.length > 0 ?
                <div className="patients-list-find-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th className={"number"}>id</th>
                            <th>Name</th>
                            <th className={"number"}>Age</th>
                            <th className={"number"}>Date of Birth</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {patientsList.map(patient => {
                            const name = patient.person.personName;
                            return (
                                <tr key={patient.id}>
                                    <td>{patient.id}</td>
                                    <td>{name.firstName + " " + name.parentName + " " + name.grandName + " " + name.familyName}</td>
                                    <td>{getPersonAge(patient.person.dateOfBirth)} </td>
                                    <td>   {patient.person.dateOfBirth}</td>
                                    <td><Link to={
                                        {
                                            pathname:`${waitingQueueURLs.waitingQueue}/${waitingQueueURLs.waitingQueueForm}`,
                                            state: {
                                                patient: patient
                                            }
                                        }
                                    }>Add to queue</Link></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                </div>
                : ""}
        </div>
    );
}

export default FindPatient;