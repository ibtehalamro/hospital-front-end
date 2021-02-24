import {frontToBackEmployee} from "../../../../Common Functions/PersonFunctions";
import {webApiURL} from "../../../../Constants/URLConstants";
import axios from 'axios';
import api from '../../../Re-usable/Api Url/apiURL'

export const getEmployee = async (setEmployee, employeeId) => {

    try {
        const result = await api.get(webApiURL.employee.getEmployee + `/${employeeId}`);

        console.log("m", result.data)
        setEmployee(result.data)
    } catch (e) {

    }


}


export const getEmployeeInformationService = async ( employeeId) => {


    const requestOne = api.get(webApiURL.employee.getEmployee + `${employeeId}`);
    const requestTwo = api.get(webApiURL.invoice.getPatientsTreatedByDoctor + `${employeeId}`);
    let data={};
  await axios.all([requestOne,requestTwo]).then(axios.spread((...responses) => {

      data = {employee:responses[0].data,invoices:responses[1].data}

    })).catch(e => {
        console.log(e)
    })
    console.log("data   ", data)
return data;
}


export const postEmployeeService = async (employee, id) => {

    employee = frontToBackEmployee(employee);
    if (id !== null) {
        employee = {...employee, id: id}
    }
    try {
        const res = await api.post(webApiURL.employee.postEmployee, employee);

       return res;
    } catch (e) {
        console.log(e.response.data)
    }
}


export const getEmployeesListService = async (pageNumber, itemsPerPage) => {
    console.log("employee list ")
    try {
        const res = await api.get(`/employee/all?page=${pageNumber}&size=${itemsPerPage}`)
        return res.data

    } catch (e) {
        console.log(e.response)
    }

}


export const checkEmployeeDept = (dueAmount) => {
    return dueAmount > 0 ? "hasDept" : ""
}

export const findEmployeeService = async (name) => {//method to get the employees list based on the person name

    try {
       return  await api.get(webApiURL.employee.findEmployeeByName + name)

    } catch (e) {

    }
}