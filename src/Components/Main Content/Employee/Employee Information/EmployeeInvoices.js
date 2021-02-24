import React, {useState} from 'react';
import {getDateFromTimeStamp, getFullName} from "../../../../Common Functions/PersonFunctions";
import {checkEmployeeDept} from "../Employee Logic/EmployeeServices";
import InvoiceInfo from "../../Invoices/InvoiceInfo";
import {useHistory} from "react-router";

const EmployeeInvoices = ({invoices}) => {

    const [showInvoices, setShowInvoices] = useState(false)
    const [invoiceProp, setInvoiceProp] = useState({})


    return (
        <div className="patient-invoices-wrapper">
            <h2  >Patients Treated </h2>

            {invoices.length > 0 ?
                <div className="patient-invoices">

                    <table className="table table-striped">
                        <thead>
                        <tr>
                             <th className={''}>Patient Name</th>

                            <th>Description</th>
                            <th>Treatment</th>

                            <th>Issued At</th>
                            <th className={'number'}>Edit</th>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            invoices.map(invoice => {


                                return <tr key={invoice.id} className={checkEmployeeDept(invoice.dueAmount)}>

                                    <td>{getFullName(invoice.patient.person.personName)}</td>

                                    <td>{invoice.description}</td>
                                    <td>{invoice.treatment}</td>
                                    <td>{getDateFromTimeStamp(invoice.issuedAt)}</td>

                                    <td onClick={()=>{setInvoiceProp(invoice)
                                        setShowInvoices(!showInvoices)}}>More</td>
                                </tr>
                            })
                        }
                        <tr className="total">
                        </tr>
                        </tbody>
                    </table>
                </div>
                : "no"}


            {showInvoices === true ? <InvoiceInfo invoice={invoiceProp} setShowInvoices={setShowInvoices}/> : ""}

        </div>
    );
};

export default EmployeeInvoices;