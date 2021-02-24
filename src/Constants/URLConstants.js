export const patientURLS={
    patient: "/patient",
    patientForm: "form",
    patientInfo: "info/",
    patientList: "all",
    postPatient: "/patient/",
    getPatient: "patient",
    getPatientInvoices:"/invoice/all",
    findPatients:"name"

}

export const invoicesURL={
    invoice:"/invoice",
    getInvoice:"id",
    invoiceForm:"form"
}

export const employeeURLS={
    employee: "/employee",
    employeeForm: "form",
    postEmployee: "/employee",
    employeeInfo: "info/",
    findEmployees:"name",
    employeeList: "all"
}

export const dashboard={
    dashboard: "/dashboard"
}

export const waitingQueueURLs={
    waitingQueue: "/waitingQueue",
    waitingQueueForm: "form",
    waitingQueueList: "list"
}
export const clinicsURLs={
    clinic: "/clinic",
    clinics: "all",
    getAllClinics: "getAllClinics"
}



export const webApiURL={
    patient:{
        findPatientByName:"/patient/name/",//findPatientByName--> must concat patient name at the end
        getPatient:"/patient",//getPatient must concat patientID at the end
        postPatient:"/patient/",//store patient info,
        getPatentsCount:"/patient/count"
    },
    invoice:{
        getPatientInvoices:"/invoice/all",//concat the patientId to get all patient invoices
        postInvoice:"/invoice/",//store the invoice
        getPatientsTreatedByDoctor:"/invoice/doctor/"
    },
    employee: {
        getAllEmployees:"/employee/all",
        getEmployee:"/employee/",
        postEmployee:"/employee/",
        deleteEmployee:"/employee/",
        findEmployeeByName:"/employee/name/",//findEmployeeByName--> must concat EmployeeRouter name at the end
    },
    waitingQueue:{
        getPatientsCountInWaitingQueue:"/queue/count/",
        postPatientToWaitingQueue:"/queue/",
        deletePatientFromWaitingQueue:"/queue/"
    },
    clinics:{
        getAllClinics: "/clinic/all/",
        postClinic: "/clinic/",
       getClinic: "/clinic/",
        deleteClinic:"/clinic/"
    }
}




