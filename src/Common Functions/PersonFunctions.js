//this method receive the person birth date and calculate his age
export const getPersonAge = (d) => {
    return new Date().getFullYear() - new Date(d).getFullYear()
}

export const getFullName = (name) => {
    const {firstName, parentName, grandName, familyName} = name;
    return firstName + " " + parentName + " " + grandName + " " + familyName;
}
export const frontToBackPatient = (patient) => {//convert form object to backend object to be sent to the backendAPI
    return {
        "person": {
            "personName": {
                "firstName": patient.firstName,
                "parentName": patient.parentName,
                "grandName": patient.grandName,
                "familyName": patient.familyName
            },
            "village": patient.village,
            "dateOfBirth": patient.dateOfBirth,
            "gender": patient.gender,
            "mobileNumber": patient.mobileNumber
        },
        "socialStatus": patient.socialStatus,
        "educationLevel": patient.educationLevel,
        "jobTitle": patient.jobTitle,
        "chronicDisease": patient.chronicDisease,
        "disability": patient.disability,
        "partnerRelation": patient.partnerRelation,
        "smoker": patient.smoker,
        "bloodGroup": patient.bloodGroup,
        "allergies": patient.allergies

    };

}
export const backToFrontPatient = (patient) => {//convert backend object to form object
//just pass the res from the backend response

    if (patient.data !== undefined) {
        patient = patient.data;
        console.log("patient in if", patient)
    }

    return {
        firstName: patient.person.personName.firstName,
        parentName: patient.person.personName.parentName,
        grandName: patient.person.personName.grandName,
        familyName: patient.person.personName.familyName,
        gender: patient.person.gender,
        dateOfBirth: patient.person.dateOfBirth,
        mobileNumber: patient.person.mobileNumber,
        allergies: patient.allergies,
        village: patient.person.village,
        bloodGroup: patient.bloodGroup,
        socialStatus: patient.socialStatus,
        educationLevel: patient.educationLevel,
        jobTitle: patient.jobTitle,
        chronicDisease: patient.chronicDisease,
        disability: patient.disability,
        partnerRelation: patient.partnerRelation,
        smoker: patient.smoker,


    }

}

export const frontToBackEmployee = (employee) => {//convert form object to backend object to be sent to the backendAPI
    return {
        "person": {
            "personName": {
                "firstName": employee.firstName,
                "parentName": employee.parentName,
                "grandName": employee.grandName,
                "familyName": employee.familyName
            },
            "village": employee.village,
            "dateOfBirth": employee.dateOfBirth,
            "gender": employee.gender,
             "mobileNumber": employee.mobileNumber
        },
        role: employee.role,
        certificate: employee.certificate,
        salary: employee.salary

    }
}

export const backToFrontEmployee = (employee) => {//convert backend object to form object
//just pass the res from the backend response

    if (employee.data !== undefined) {
        employee = employee.data;
        console.log("patient in if", employee)
    }
    return {
        firstName: employee.person.personName.firstName,
        parentName: employee.person.personName.parentName,
        grandName: employee.person.personName.grandName,
        familyName: employee.person.personName.familyName,
        gender: employee.person.gender,
        dateOfBirth: employee.person.dateOfBirth,
        mobileNumber: employee.person.mobileNumber,
        village: employee.person.village,
         role: employee.role,
        certificate: employee.certificate,
        salary: employee.salary

    }
}

export const getDateFromTimeStamp = (timeStamp) => {
    const timestamp = new Date(timeStamp);
    let formattedTimestamp = Intl.DateTimeFormat('en-PS', {
        year: "numeric",
        month: "short",
        day: "2-digit",
        // hour: "numeric",
        // minute: "2-digit"
    }).format(timestamp);
    return formattedTimestamp

}