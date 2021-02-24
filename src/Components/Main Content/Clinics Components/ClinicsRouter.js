import React from 'react';
import {clinicsURLs as clinicsURL} from "../../../Constants/URLConstants";
import Clinic from "./Clinic";
import {Route, useRouteMatch} from "react-router";

const ClinicsRouter = () => {
    return (
        <div>
            <Route exact path={`${clinicsURL.clinic}/${clinicsURL.clinics}`} component={Clinic}/>
            <Route exact path={`${clinicsURL.clinic}/${clinicsURL.clinics}/:id`} component={Clinic}/>
        </div>
    );
};

export default ClinicsRouter;