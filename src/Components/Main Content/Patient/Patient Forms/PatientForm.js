import React, {useEffect, useState} from 'react';

import {useForm} from "react-hook-form";
import TextInputCustom from "../../../Re-usable/FormComponents/TextInputCustom";

import SelectCustom from "../../../Re-usable/FormComponents/SelectCustom";
import NumberInputCustom from "../../../Re-usable/FormComponents/NumberInputCustom";
import * as classnames from "classnames";
import {postPatientService} from "../Patient Logic/PatientServices";
import {backToFrontPatient} from "../../../../Common Functions/PersonFunctions";
import {messages, registerObject, registerObjectNames} from "../../../../Common Functions/FormObjects";


const PatientForm = ({patient}) => {
    let timer;
// only the form here
    const {
        register,
        handleSubmit,
        errors
    } = useForm(patient !== undefined ? {defaultValues: backToFrontPatient(patient)} : {});
    const [serverError, setServerError] = useState()//if there is server errors returned stored here


    const [added, setAdded] = useState(null)
    const onSubmit = async (data, e) => {
        setServerError("");
        setAdded(false)
        try {
            const res = await postPatientService(data, patient === undefined ? null : patient.id, setServerError, setAdded, e)
            if (res.status === 201) {
                setAdded(true)
                timer = setTimeout(() =>
                        setAdded(false)
                    , 5000)
            }
            console.log("submit timer", timer)

            e.target.reset();

        } catch (e) {
            console.log(e?.response?.data)
            e?.response === undefined ? setServerError("Something went wrong on our end!") : setServerError(e.response.data.message);
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

            <h2 className="form-heading">Patient Form</h2>
            {patient !== undefined ? <h4 className="form-heading">Patient ID: {patient.id}</h4> : ""}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group-wrapper">
                    <TextInputCustom field="firstName" label="First Name" errorMessages={messages}
                                     form={{register, errors, registerObject: registerObjectNames}}/>
                    <TextInputCustom field="parentName" label="Parent Name" errorMessages={messages}
                                     form={{register, errors, registerObject: registerObjectNames}}/>
                    <TextInputCustom field="grandName" label="Grand Name" errorMessages={messages}
                                     form={{register, errors, registerObject: registerObjectNames}}/>
                    <TextInputCustom field="familyName" label="Family Name" errorMessages={messages}
                                     form={{register, errors, registerObject: registerObjectNames}}/>

                </div>
                <div className="form-group-wrapper group5">

                    <SelectCustom field="gender" label="Gender" errorMessages={messages}
                                  form={{register, errors, registerObject}}
                                  options={[{text: "Female", value: "true"}, {text: "Male", value: "false"}]}/>


                    <SelectCustom field="bloodGroup" label="Blood Group" errorMessages={messages}
                                  form={{register, errors}}
                                  options={[{text: "A+", value: "A+"}, {text: "A-", value: "A-"}, {
                                      text: "B+",
                                      value: "B+"
                                  }, {text: "B-", value: "B-"}, {text: "A-", value: "A-"}, {text: "A-", value: "A-"}]}/>
                    <SelectCustom field="village" label="Village" errorMessages={messages}
                                  form={{register, errors}}
                                  options={[{text: "المجد", value: "المجد"}, {text: "سكا", value: "سكا"},
                                      {text: "طواس", value: "طواس"},
                                      {text: "دير العسل التحتا", value: "دير العسل التحتا"},
                                      {text: "دير العسل الفوقا", value: "دير العسل الفوقا"},
                                      {text: "بيت عوا", value: "بيت عوا"}, {text: "دير سامت", value: "دير سامت"},
                                      {text: "الكوم", value: "الكوم"}, {text: "بيت مرسم", value: "بيت مرسم"},
                                      {text: "البرج", value: "البرج"}]}/>
                    <SelectCustom field="smoker" label="Smoker" errorMessages={messages}
                                  form={{register, errors}}
                                  options={[{text: "No", value: "false"}, {text: "Yes", value: "true"}]}/>


                </div>


                <div className="form-group-wrapper">
                    <NumberInputCustom field="mobileNumber" label="Mobile Number"
                                       errorMessages={messages}
                                       form={{register, errors, registerObject}}/>
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
                    <SelectCustom field="partnerRelation" label="Partner Relation" errorMessages={messages}
                                  form={{register, errors}}
                                  options={[{text: "None", value: "none"}, {text: "1st Degree", value: "1st"}]}/>
                </div>
                <div className="form-group-wrapper">
                    <TextInputCustom field="jobTitle" placeholder="Job Title" label="Job Title" errorMessages={messages}
                                     form={{register, errors}}/>
                    <TextInputCustom field="chronicDisease" placeholder="Chronic Disease" label="Chronic Disease"
                                     errorMessages={messages} form={{register, errors}}/>
                    <TextInputCustom field="allergies" label="Allergies" errorMessages={messages}
                                     form={{register, errors}}/>
                    <TextInputCustom field="disability" label="Disability" errorMessages={messages}
                                     form={{register, errors}}/>
                </div>

                {/*will check if backend returns errors*/}
                {serverError && <p className={"server-error"}> {serverError}</p>}

                <input className=" hello" type="submit"/>
            </form>

            <hr/>
            <h3 className="information-saved">   {added === true ? "PatientRouter information saved successfully." : null}</h3>
        </div>
    );
};

export default PatientForm;