import api from "../../../Re-usable/Api Url/apiURL";
import {webApiURL as webApiUrl} from "../../../../Constants/URLConstants";




export const getPatientsCountService = async () => {
    try {
        const res = await api.get(webApiUrl.patient.getPatentsCount);
        return res.data;

    } catch (e) {

    }
}