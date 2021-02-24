import './App.scss';
import React, {Suspense} from "react";
import Header from "./Components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import {Redirect, Route, Switch} from "react-router";
import store from "./Redux/Store";

import {
    clinicsURLs as clinicsURL,
    dashboard,
    employeeURLS,
    invoicesURL,
    patientURLS,
    waitingQueueURLs
} from "./Constants/URLConstants";
import {useSelector} from "react-redux";
import LandingPage from "./Components/User Management/LandingPage";
import RegisterPage from "./Components/User Management/RegisterPage";
import LoginPage from "./Components/User Management/LoginPage";

import jwt_decode from "jwt-decode";
import {SET_CURRENT_USER} from "./Redux/Types/Types";
import setJWTToken from "./Components/User Management/Security/setJWTToken";
import {logout} from "./Redux/Actions/SecurityActions";
import SecuredRoute from "./Components/User Management/Security/SecureRoute";
import ErrorComponent from "./Components/Error Components/ErrorComponent";
import Dashboard from "./Components/Main Content/Dashboard/Dashboard";

const patient = React.lazy(() => import(/* webpackChunkName: "patient-component" */ './Components/Main Content/Patient/PatientRouter'));
const employee = React.lazy(() => import(/* webpackChunkName: "employee-component" */  './Components/Main Content/Employee/EmployeeRouter'));
const waitingQueue = React.lazy(() => import(/* webpackChunkName: "waitingQueue-component" */  './Components/Main Content/Waiting Queue/WaitingQueueRouter'));
const clinics = React.lazy(() => import( /* webpackChunkName: "clinics-component" */ './Components/Main Content/Clinics Components/ClinicsRouter'));
const invoices = React.lazy(() => import( /* webpackChunkName: "invoices-component" */ './Components/Main Content/Invoices/InvoicesRouter'));



const jwtToken = localStorage.jwtToken;
console.log("decoded_jwtToken 1",jwtToken)

const checkTokenExpiration=()=>{
    const jwtToken = localStorage.jwtToken;
    if(jwtToken){
        const currentTime = Date.now() / 1000;
        console.log("currentTime",currentTime)
        if (jwt_decode(jwtToken).exp < currentTime) {
            console.log("decoded_jwtToken time expires")
            //handle logout
            store.dispatch(logout())
            window.location.href = "/landing";
        }
    }
}
if (jwtToken) {
    console.log("decoded_jwtToken check")

    setJWTToken(jwtToken);
    const decoded_jwtToken = jwt_decode(jwtToken);
    store.dispatch({
        type: SET_CURRENT_USER,
        payload: decoded_jwtToken
    });
checkTokenExpiration();

}



function App() {
checkTokenExpiration();
    const security = useSelector(state => state.security);

    return (

        <div className="application">

            <BrowserRouter>
                <Header/>
                <main className="main-content">
                    <Switch>
                        <Route exact path={"/landing"} component={LandingPage}/>
                        <Route exact path={"/register"} component={RegisterPage}/>
                        <Route exact path={"/login"} component={LoginPage}/>

                        <Suspense fallback={<div> Loading .......</div>}>
                            <Switch>
                                {/*Dashboard routes*/}
                                <SecuredRoute path={dashboard.dashboard} security={security} component={Dashboard}/>

                                {/*patient routes*/}
                                <SecuredRoute path={patientURLS.patient} security={security} component={patient}/>

                                {/*employee routes*/}
                                <SecuredRoute path={employeeURLS.employee} security={security} component={employee}/>

                                {/*waiting queue routers*/}
                                <SecuredRoute path={waitingQueueURLs.waitingQueue} security={security}
                                              component={waitingQueue}/>

                                {/*clinics routers*/}
                                <SecuredRoute path={clinicsURL.clinic} security={security} component={clinics}/>

                                {/*invoice routers*/}
                                <SecuredRoute path={invoicesURL.invoice} security={security} component={invoices}/>
                                default:
                                <Route path={"*"} render={(props => <ErrorComponent {...props} message={"Sorry we are unable to find your page"} />)}/>
                                {/*{security.validToken === true ? <Route path={"*"} render={(props => <ErrorComponent {...props} message={"Sorry we are unable to find your page"} />)} />:<Redirect to={"/landing"}/>}*/}

                            </Switch>

                        </Suspense>
                    </Switch>
                </main>

            </BrowserRouter>

        </div>
    );
}

export default App;
