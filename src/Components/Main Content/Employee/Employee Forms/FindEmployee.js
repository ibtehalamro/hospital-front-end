import React, {useState} from 'react';
import TextInputCustom from "../../../Re-usable/FormComponents/TextInputCustom";
import {useForm} from "react-hook-form";
import {messages, registerObject} from "../../../../Common Functions/FormObjects";
import {findEmployeeService} from "../Employee Logic/EmployeeServices";
import {getPersonAge} from "../../../../Common Functions/PersonFunctions";
import {Link} from "react-router-dom";
import {employeeURLS} from "../../../../Constants/URLConstants";


function FindEmployee({onSubmit, onChange}) {

    const [employeesList, setEmployeesList] = useState([])//result of searching the employee name stored here as array
    const [serverError, setServerError] = useState()//if there is server errors returned stored here

    const {register, errors, handleSubmit} = useForm();

    const onChangeName = async (e) => {

        setServerError("")
        try {
            if (e.target.value.length === 0) {
            setEmployeesList([])
        }
            else  {
                const res = await findEmployeeService(e.target.value, setEmployeesList, setServerError);
                setEmployeesList(res.data)
            }
        } catch (e) {

            setServerError(e?.response?.data)
            setEmployeesList([])
        }


    };

    return (
        <div className="find-person-form-wrapper">

            <h3>Type the employee name then locate him in the bellow list</h3>
            <br/>

            <form className={"find-person-form"} onSubmit={handleSubmit(onSubmit)}>
                <TextInputCustom field="firstName" label="First Name" errorMessages={messages}
                                 form={{register, errors, registerObject}} onChange={onChangeName}/>
            </form>
            {serverError && <p className="font-weight-bold text-danger">{serverError.message}</p>}
            {employeesList !== undefined && employeesList.length > 0 ?
                <div className="employees-list-find-wrapper">
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
                        {employeesList.map(employee => {
                            const name = employee.person.personName;
                            return (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{name.firstName + " " + name.parentName + " " + name.grandName + " " + name.familyName}</td>
                                    <td>{getPersonAge(employee.person.dateOfBirth)} </td>
                                    <td>   {employee.person.dateOfBirth}</td>
                                    <td>
                                        <Link to={employeeURLS.employeeInfo + employee.id}>info</Link></td>
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

export default FindEmployee;