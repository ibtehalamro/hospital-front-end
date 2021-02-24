import React, {useEffect, useState} from 'react';
import {getEmployeeInformationService} from "../Employee Logic/EmployeeServices";
import EmployeeBio from "./EmployeeBio";
import EmployeeForm from "../Employee Forms/EmployeeForm";
import EmployeeInvoices from "./EmployeeInvoices";

const EmployeeInformationWrapper = (props) => {
    const id = props.match.params.id;
    const [employee, setEmployee] = useState();
    const [invoices, setInvoices] = useState();
    const [employeeInfo, setEmployeeInfo] = useState(true);

     const getEmployeeInformation=async ()=> {
        const res=  await getEmployeeInformationService(  id);
        console.log(res);
        const {employee,invoices} = res;
        setEmployee(employee)
        setInvoices(invoices)
    }

    useEffect(() => {
      let mounted=true;

      if (mounted)
          getEmployeeInformation()
        return ()=>{
          mounted=false;
        }
    }, [])

    return (<>
            {employeeInfo === true ?<div className="person-information-wrapper">
                <div className="person-information-data-wrapper">

                     {
                        invoices === undefined ? "No available invoces" : <EmployeeInvoices invoices={invoices}/>

                    }
                </div>
                {employee === undefined ? "no employee" : <EmployeeBio setEmployeeInfo={setEmployeeInfo} employee={employee}/>}

            </div> : <EmployeeForm employee={employee}/>}
        </>
    );
};

export default EmployeeInformationWrapper;