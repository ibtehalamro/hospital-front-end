import api from '../../../Re-usable/Api Url/apiURL'
import {webApiURL as webApiUrl} from "../../../../Constants/URLConstants";


export const getAllClinicsService = async () => {
    try {
        const res = await api.get(webApiUrl.clinics.getAllClinics);
        return res.data;

    } catch (e) {

    }
}
export const getClinicService = async (clinicId) => {
    try {
        const res = await api.get(webApiUrl.clinics.getClinic + clinicId);
        return res.data;
    } catch (e) {

    }
}

export const postClinicService = async (clinic, setError) => {
    try {
        await api.post(webApiUrl.clinics.postClinic, clinic);
    } catch (e) {
        console.log(e.response.data);
        setError("clinicName", {type: "invalid", message: e.response.data.message})
    }
}