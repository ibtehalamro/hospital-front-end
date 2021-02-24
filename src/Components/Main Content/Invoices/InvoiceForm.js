import React from 'react';
import {useForm} from "react-hook-form";
import {patientURLS} from "../../../Constants/URLConstants";
import TextInputCustom from "../../Re-usable/FormComponents/TextInputCustom";
import {messages, registerObject} from "../../../Common Functions/FormObjects";
import NumberInputCustom from "../../Re-usable/FormComponents/NumberInputCustom";
import {useHistory, useLocation, useParams} from "react-router";
import {postInvoiceService} from "./Invoices Logic/InvoiceFunctions";


function InvoiceForm(props) {

    let history = useHistory();
    const location=useLocation()
    console.log("location",location)
    const {register, handleSubmit, errors} = useForm(props.location.state.invoice !== undefined ?
        {defaultValues: props.location.state.invoice} : "");
    const {id:patientId }= useParams()
    const patientFullName = props.location !== undefined ? props.location.state.patient : props.fullName;


    const onSubmit =async (data) => {
        const invoiceId = location.state?.invoice?.id
        const employeeId =location.state.employeeId


     const res=  await postInvoiceService({...data, patient: {id: patientId}, id: invoiceId, doctorId: employeeId});
        if (res.status === 201) {
            console.log("invoice form ")
            history.push(`${patientURLS.patient}/${patientURLS.patientInfo}${patientId}`)
        }
    }
    return (
        <div className="invoice-form">

            <h1>Employee Id => {location.state.employeeId}</h1>

            <h1>Invoice Form</h1>
            <hr className="mb-4 "/>

            <h4>Patient id : {patientId}</h4>
            <h4>Patient Name : {patientFullName}</h4>
            <hr className="mb-4 "/>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 pt-4 ">
                <TextInputCustom field="description" label="DX" errorMessages={messages}
                                 form={{register, errors, registerObject}}/>
                <TextInputCustom field="treatment" label="RX" errorMessages={messages}
                                 form={{register, errors, registerObject}}/>
                <div className="group">
                    <NumberInputCustom field="charged" label="Charged" errorMessages={messages}
                                       form={{register, errors, registerObject}}/>
                    <NumberInputCustom field="amountPayed" label="Amount Payed" errorMessages={messages}
                                       form={{register, errors, registerObject}}/>
                </div>

                <input className="form-control w-75 m-auto" type="submit"/>
            </form>

        </div>
    );
}

export default InvoiceForm;
