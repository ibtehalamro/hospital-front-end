import api from "../../../Re-usable/Api Url/apiURL";
import {patientURLS, webApiURL} from "../../../../Constants/URLConstants";

export   const postInvoiceService = async (data) => {

    try {
        return  await api.post(webApiURL.invoice.postInvoice, data);


    } catch
        (e) {
    }
}