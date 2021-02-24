import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import TextInputCustom from "../../../Re-usable/FormComponents/TextInputCustom";
import SelectCustom from "../../../Re-usable/FormComponents/SelectCustom";
import NumberInputCustom from "../../../Re-usable/FormComponents/NumberInputCustom";
import * as classnames from "classnames";
import {messages, registerObject} from "../../../../Common Functions/FormObjects";
import {backToFrontEmployee} from "../../../../Common Functions/PersonFunctions";
import {postEmployeeService} from "../Employee Logic/EmployeeServices";


const EmployeeForm = ({employee}) => {
// only the form here
    let timer = undefined;
    const {
        register,
        handleSubmit,
        errors
    } = useForm(employee !== undefined ? {defaultValues: backToFrontEmployee(employee)} : {});

    const [serverError, setServerError] = useState("")//if there is server errors returned stored here

    const [added, setAdded] = useState(null)

    const onSubmit = async (data, e) => {

        setServerError("");
        setAdded(false)

        try {
            const res = await postEmployeeService(data, employee === undefined ? null : employee.id, setServerError, setAdded, e)
            if (res.status === 201) {
                setAdded(true)
                timer = setTimeout(() =>
                        setAdded(false)
                    , 5000);
            }
            e.target.reset();
        } catch (e) {
            //TODO handle validation errors
            setServerError(e.response.data);
        }


    }

    useEffect(() => {
        return () => {
            console.log("close timer")
            console.log("close timer", timer)
            if (timer)
                clearTimeout(timer);
        }
    }, [timer])
    return (
        <div className="person-form-wrapper">

            <h2 className="form-heading">Employee Form</h2>

            {/*will check if backend returns errors*/}
            {serverError && <p> {serverError.message}</p>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group-wrapper">
                    <TextInputCustom field="firstName" label="First Name" errorMessages={messages}
                                     form={{register, errors, registerObject}}/>
                    <TextInputCustom field="parentName" label="Parent Name" errorMessages={messages}
                                     form={{register, errors, registerObject}}/>
                    <TextInputCustom field="grandName" label="Grand Name" errorMessages={messages}
                                     form={{register, errors, registerObject}}/>
                    <TextInputCustom field="familyName" label="Family Name" errorMessages={messages}
                                     form={{register, errors, registerObject}}/>

                </div>
                <div className="form-group-wrapper group5">

                    <SelectCustom field="gender" label="Gender" errorMessages={messages}
                                  form={{register, errors, registerObject}}
                                  options={[{text: "Female", value: "true"}, {text: "Male", value: "false"}]}/>


                    <div className="form-group">
                        <label htmlFor="dateOfBirth">
                            Date Of Birth
                        </label>
                        <input className={classnames('form-control', {"is-invalid": errors.dateOfBirth})}
                               key="dateOfBirth"
                               type="date"
                               name="dateOfBirth"
                               ref={register({required: true})}
                        />
                        {errors.dateOfBirth && errors.dateOfBirth.type === "required" &&
                        <p className=" p-2 invalid-feedback fa fa-exclamation-triangle">
                            Date Of Birth must be a valid date
                        </p>
                        }
                    </div>
                </div>


                <div className="form-group-wrapper">
                    <NumberInputCustom field="mobileNumber" label="Mobile Number"
                                       errorMessages={messages}
                                       form={{register, errors, registerObject}}/>
                    <NumberInputCustom field="socialNumber" label="Social Number" errorMessages={messages}
                                       form={{register, errors}}/>
                    <NumberInputCustom field="salary" label="Salary" errorMessages={messages}
                                       form={{register, errors, registerObject}}/>
                </div>
                <div className="form-group-wrapper">

                    <SelectCustom field="socialStatus" label="Social Status" errorMessages={messages}
                                  form={{register, errors}}
                                  options={[{text: "Single", value: "single"}, {text: "Married", value: "married"},
                                      {text: "Divorced", value: "divorced"}, {text: "Widow", value: "widow"}]}/>

                    <SelectCustom field="educationLevel" label="Education Level" errorMessages={messages}
                                  form={{register, errors}}
                                  options={[{text: "None", value: "none"}, {text: "Elementary", value: "elementary"},
                                      {text: "High School", value: "high-school"}, {text: "Diploma", value: "diploma"},
                                      {text: "Bachelor", value: "bachelor"}, {text: "Master", value: "master"},
                                      {text: "Doctor", value: "Doctor"}]}/>
                </div>
                <div className="form-group-wrapper">
                    <TextInputCustom field="jobTitle" placeholder="Job Title" label="Job Title" errorMessages={messages}
                                     form={{register, errors}}/>
                </div>

                {/*will check if backend returns errors*/}
                {serverError && <p className={"server-error"}> {serverError.message}</p>}

                <input className=" " type="submit"/>
            </form>

            <hr/>
            <h3 className="information-saved">   {added === true ? "Employee information saved successfully." : null}</h3>
        </div>
    );
};

export default EmployeeForm;