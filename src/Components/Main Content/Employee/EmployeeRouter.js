import React from "react";
import {NavLink} from "react-router-dom";
import EmployeeInformationWrapper from "./Employee Information/EmployeeInformation";
import {Route, useRouteMatch} from "react-router";
import EmployeeForm from "../Employee/Employee Forms/EmployeeForm";
import FindEmployee from "../Employee/Employee Forms/FindEmployee";
import EmployeeListTable from "../Employee/Employee Forms/EmployeeListTable";
import {employeeURLS} from "../../../Constants/URLConstants";

const EmployeeRouter = (props) => {

    const match = useRouteMatch();

    return (

        <div className="person-wrapper">
            
            <div className="person-component-buttons">
                <NavLink className="person large-button" to={`${match.url}/${employeeURLS.employeeForm}`}>Create Employee</NavLink>
                <NavLink className="person large-button" to={`${match.url}/${employeeURLS.findEmployees}`}>Find Employee</NavLink>
                <NavLink className="person large-button" to={`${match.url}/${employeeURLS.employeeList}`}>Employees List</NavLink>
            </div>

            <div className="person-components">
                    <Route exact path={`${match.url}/${employeeURLS.employeeForm}`} component={EmployeeForm}/>
                    <Route exact path={`${match.url}/${employeeURLS.findEmployees}`} component={FindEmployee}/>
                    <Route exact path={`${match.url}/${employeeURLS.employeeList}`} component={EmployeeListTable}/>
                    <Route exact path={`${match.url}/${employeeURLS.employeeInfo}:id`} component={EmployeeInformationWrapper}/>
            </div>

        </div>


    )

}

export default EmployeeRouter;