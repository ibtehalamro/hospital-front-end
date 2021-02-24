import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {postClinicService} from "./Clinics Functions/ClinicsServices";
import TextInputCustom from "../../Re-usable/FormComponents/TextInputCustom";
import {messages, registerObject} from "../../../Common Functions/FormObjects";
import {useHistory} from "react-router";
import {clinicsURLs as clinicsURL} from "../../../Constants/URLConstants";


function ClinicForm({ clinic}) {
    const history = useHistory();

    const {handleSubmit, errors,setError, register} = useForm(clinic===undefined?{ }:{defaultValues:{clinicName:clinic.clinicName}});

    function onSubmit(data, e) {
        data.clinicName=data.clinicName.trim();
         if (clinic!== undefined)
            data = {...data, id: clinic.id }
try{
    postClinicService(data,setError).then(() => {
        e.target.reset();
        history.push(`${clinicsURL.clinic}/${clinicsURL.clinics}`)
    });
}catch (e){
    console.log("error on submit")
return null
}

    }

    return <div className=" clinic-form-container">
        {clinic === undefined ? <h1 className="mainTitle">Add Clinic</h1>
                :
                <div>
                    <h1>Edit Clinic </h1>
                    <h4>previous name : {clinic.clinicName}</h4>
                </div>}
            <>

                <p className="font-weight-bold">Choose a unique clinic name</p>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <TextInputCustom field="clinicName" label="Clinic Name" errorMessages={messages}
                                     form={{register, errors, registerObject}}/>
                    <input type="submit"/>
                </form>
            </>

        </div>


}

export default ClinicForm;