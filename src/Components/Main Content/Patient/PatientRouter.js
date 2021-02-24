import React from "react";
import {NavLink} from "react-router-dom";
import {Route, useRouteMatch} from "react-router";
import PatientForm from "./Patient Forms/PatientForm";
import FindPatient from "./Patient Forms/FindPatient";
import {patientURLS} from "../../../Constants/URLConstants";
import PatientListTable from "./PatientListTable";
import PatientInformationWrapper from "./Patient Information/PatientInformationWrapper";


const PatientRouter = () => {
    const match = useRouteMatch();

    return (

        <div className="person-wrapper">
            <div className="person-component-buttons">
                <NavLink className="person large-button" to={`${match.url}/${patientURLS.patientForm}`}>Create Patient</NavLink>
                <NavLink className="person large-button" to={`${match.url}/${patientURLS.findPatients}`}>Find Patient</NavLink>
                <NavLink className="person large-button" to={`${match.url}/${patientURLS.patientList}`}>Patients List</NavLink>
            </div>

            <div className="person-components">

                <Route exact path={`${match.url}/${patientURLS.patientForm}`} component={PatientForm}/>
                <Route exact path={`${match.url}/${patientURLS.findPatients}`} component={FindPatient}/>
                <Route exact path={`${match.url}/${patientURLS.patientList}`} component={PatientListTable}/>
                <Route exact path={`${match.url}/${patientURLS.patientInfo}:id`}
                       component={PatientInformationWrapper}/>

            </div>


        </div>


    )

}

export default PatientRouter;