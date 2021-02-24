import React, {useLayoutEffect, useState} from 'react';

import PersonCard from "../../../Re-usable/PersonCard";
import {getEmployeesListService} from "../Employee Logic/EmployeeServices";
import Pagination from "../../../Re-usable/Pagination/Pagination";
import {employeeURLS} from "../../../../Constants/URLConstants";


function EmployeeListTable( ) {
    const [employee, setEmployee] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const paginate = async (pageNumber) => {
        console.log('pagination called')
        setCurrentPage(pageNumber)
        const res=   await getEmployeesListService(   pageNumber, itemsPerPage)
        setEmployee(res.content);
        setTotalPages(res.totalPages);
    }

    const getEmployeeList = async () => {

        const res=await getEmployeesListService(0,itemsPerPage);
        setEmployee(res.content);
        setTotalPages(res.totalPages);
    }

    useLayoutEffect(() => {

        let mounted=true;

        if (mounted)
        getEmployeeList();

        return () => {
            mounted = false
        }
    }, [])



    return (

        <div className=" employee-table cards-table-wrapper">

            {
               employee &&  employee.length > 0 ?
                    employee.map((employee, index) => {
                        return <PersonCard key={index} person={employee} infoPageUrl={employeeURLS.employeeInfo}/>
                    })

                    : "no employees found"
            }

            <Pagination totalPages={totalPages} current={currentPage} paginate={paginate}/>

        </div>

    );
}

export default EmployeeListTable;
