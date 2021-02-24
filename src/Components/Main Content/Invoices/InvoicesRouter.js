import React from 'react';
import {invoicesURL} from "../../../Constants/URLConstants";
import InvoiceInfo from "./InvoiceInfo";
import InvoiceForm from "./InvoiceForm";
import {Route, useRouteMatch} from "react-router";

const InvoicesRouter = () => {
const match=useRouteMatch()
    return (
        <div>
            <Route exact path={`${match.url}/${invoicesURL.getInvoice}/:id`} component={InvoiceInfo}/>
            <Route exact path={`${match.url}/${invoicesURL.invoiceForm}/:id`} component={InvoiceForm}/>
        </div>
    );
};

export default InvoicesRouter;