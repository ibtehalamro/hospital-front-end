import React from 'react';
import {getDateFromTimeStamp, getFullName} from "../../../Common Functions/PersonFunctions";


const InvoiceInfo = ({invoice, setShowInvoices}) => {
    console.log('invoice bill', invoice)
    return (
        <div className={'invoice-info-wrapper'}>
            <div className="content">
                <div className="header">

                    <h3 className={'invoice-id'}> #{invoice.id}</h3>
                    <h2 className={'close'} onClick={() => {
                        setShowInvoices(false)
                    }}> X</h2>

                </div>
                <h3 className="invoice-patient">{getFullName(invoice.patient.person.personName)}</h3>

                <div className={'item'}>
                    <h5>Date of issue:</h5>
                    <h5>{getDateFromTimeStamp(invoice.issuedAt)}</h5>
                </div>
                <div className={'item'}>
                    <h5>Mobile Number:</h5>
                    <h5>{invoice.patient.person.mobileNumber}</h5>
                </div>
                <div className={'item'}>
                    <h5>Gender:</h5>
                    <h5>{invoice.patient.person.gender === true ? "Female" : "Male"}</h5>
                </div>

                <table className="table ">
                    <thead>
                    <tr>
                        <th>Treatment</th>
                        <th>Description</th>
                        <th className={'number'}>Charged</th>
                        <th className={'number'}>Payed</th>
                        <th className={'number'}>Due Amount</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr key={invoice.id}>
                        <td>{invoice.treatment}</td>
                        <td>{invoice.description}</td>
                        <td>{invoice.charged}</td>
                        <td>{invoice.amountPayed}</td>
                        <td>{invoice.dueAmount}</td>


                    </tr>
                    </tbody>
                </table>


            </div>

            <div className='background' onClick={() => {
    setShowInvoices(false)
}}/>

        </div>
    );
};

export default InvoiceInfo;