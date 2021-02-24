import api from '../../../Re-usable/Api Url/apiURL'
import {frontToBackPatient} from "../../../../Common Functions/PersonFunctions";
import axios from 'axios';
import {webApiURL} from "../../../../Constants/URLConstants";

export const getPatientService = async (setPatient, patientId) => {

    try {
        const result = await api.get(webApiURL.patient.getPatient + `/${patientId}`);

        console.log("m", result.data)
        setPatient(result.data)
    } catch (e) {

    }


}


export const getPatientInformationService = async (patientId) => {

    const requestOne = api.get(webApiURL.patient.getPatient + `/${patientId}`);
    const requestTwo = api.get(webApiURL.invoice.getPatientInvoices + `/${patientId}`);

    let data={}
  await axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {

      data = {patient:responses[0].data,invoices:responses[1].data}

  })).catch(e => {
      console.log(e)
  })

    return data

}


export const postPatientService = async (patient, id, setServerError, setAdded, e) => {

    patient = frontToBackPatient(patient);
    if (id !== null) {
        patient = {...patient, id: id}
    }
    return await api.post(webApiURL.patient.postPatient, patient)


}

export const submitPatient = (patient) => {


    postPatientService(patient).then(value => console.log('patient submitted'));
}


export const getPatientsListService = async (pageNumber, itemsPerPage) => {
    try {
        const response=await api.get(`/patient/all?page=${pageNumber}&size=${itemsPerPage}`)
        console.log("response from service",response)
        return response

    } catch (e) {

        console.log(e.response.data)
    }

}


export const checkPatientDept = (dueAmount) => {
    return dueAmount > 0 ? "hasDept" : ""
}

export const findPatientsForm = async (name, setPatientsList, setServerError) => {//method to get the patients list based on the person name if there is any error it is stored in the --> serverError
    console.log(name)
    try {
        const res = await api.get(webApiURL.patient.findPatientByName + name)
        setPatientsList(res.data)
    } catch (e) {
        if (e.response)
            setServerError(e.response.data)
        setPatientsList([])
    }
}