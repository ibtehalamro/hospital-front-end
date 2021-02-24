import React, {useState} from 'react';
import {getDateFromTimeStamp} from "../../../../Common Functions/PersonFunctions";
import {checkPatientDept} from "../Patient Logic/PatientServices";
import InvoiceInfo from "../../Invoices/InvoiceInfo";
import {invoicesURL} from "../../../../Constants/URLConstants";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

const PatientInvoices = ({invoices}) => {

    let history = useHistory();
    const [showInvoices, setShowInvoices] = useState(false)
    const [invoiceProp, setInvoiceProp] = useState({})


    let charged = 0, payed = 0, due = 0

    const increment = (chargedAmount, amountPayed, dueAmount) => {

        charged += chargedAmount
        payed += amountPayed
        due += dueAmount
    }

    return (
        <div className="patient-invoices-wrapper">
            <h2>Patient Invoices and Visits</h2>

            {invoices.length > 0 ?
                <div className="patient-invoices">

                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Issued At</th>
                            <th>Treatment</th>
                            <th className={'number'}>Charged</th>
                            <th className={'number'}>Payed</th>
                            <th className={'number'}>Due Amount</th>
                            <th className={'number'}>Doctor Id</th>
                            <th>Edit</th>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            invoices.map(invoice => {

                                increment(invoice.charged, invoice.amountPayed, invoice.dueAmount)

                                return <tr key={invoice.id} className={checkPatientDept(invoice.dueAmount)}>
                                    <td>{getDateFromTimeStamp(invoice.issuedAt)}</td>
                                    <td>{invoice.treatment}</td>
                                    <td>{invoice.charged}</td>
                                    <td>{invoice.amountPayed}</td>
                                    <td>{invoice.dueAmount}</td>
                                    <td>{invoice.doctorId}</td>

                                    <td><Link className="text-success font-weight-bold" to={{
                                        pathname:  `${invoicesURL.invoice}/${invoicesURL.invoiceForm}/${invoice.patient.id}`,
                                        state: {
                                            patient: "patientname edit this "
                                            , invoice: invoice,
                                            employeeId: invoice.doctorId

                                        }
                                    }}>Edit Invoice</Link></td>
                                </tr>
                            })
                        }

                        </tbody>
                    </table>
                    <div className="total">

                        <h3 className={"title"}>Total</h3>

                        <div className={"item"}>
                            <h4>Charged</h4>
                            <h4>{charged}</h4>
                        </div>

                        <div className={"item"}>
                            <h4>Payed</h4>
                            <h4>{payed}</h4>
                        </div>
                        <div className={"item"}>
                            <h4>Due</h4>
                            <h4>{due}</h4>
                        </div>


                    </div>
                </div>
                : <div className={"warning"}><h4>No available invoices yet </h4></div>}



            {showInvoices === true ? <InvoiceInfo invoice={invoiceProp} setShowInvoices={setShowInvoices}/> : ""}

        </div>
    );
};

export default PatientInvoices;