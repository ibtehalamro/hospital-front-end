import React, {useLayoutEffect, useState} from 'react';


import {deletePatientFromWaitingQueue, getAllQueuesService} from "./Waiting Queue Logic/WaitingQueueServices";
import {invoicesURL} from "../../../Constants/URLConstants";
import {Link} from "react-router-dom";

function WaitingQueueList() {
    const QueueTableBody = [
        "id",
        "patientFullName",
    ]
    const [waitingQueue, setWaitingQueue] = useState([])
    const [deleted, setDeleted] = useState("")

    const fetchData = async () => {
        setWaitingQueue(await getAllQueuesService())
    }

    useLayoutEffect(() => {
        let mounted=true;

        if (mounted)
        fetchData()

        return ()=>{mounted=false}
    }, [])


    const deletePatientFromQueueMethod = async (id) => {
        const res = await deletePatientFromWaitingQueue(id)
        if (res.status === 201) {
            setTimeout(() => setDeleted(""), 1500)
            setDeleted("Patient Router deleted")
            await fetchData()
        } else {

        }
    }


    return <div className="waiting-queue-list-wrapper">
        {deleted}
        {(waitingQueue === undefined || Object.keys(waitingQueue).length === 0) ?
            <div className="waiting-queue-list-wrapper text-center">
                <h4>Add patients to the waiting Queue to view them</h4>
            </div>
            :
            Object.keys(waitingQueue).map((key) => {
                    if (waitingQueue[key].length !== 0) {

                        let value = waitingQueue[key];
                        return <div key={key} className="waiting-queue-list ">
                            <h1 className="text-center ">{key}</h1>

                            <hr/>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th className={"number"}>Queue Number</th>
                                    <th className={"number"}>ID</th>
                                    <th>Patient Full Name</th>
                                    <th>Charge Patient</th>
                                    <th>Remove from Queue</th>
                                </tr>
                                </thead>
                                <tbody>
                                {value.map((body, index) =>
                                    <tr key={body.id}>
                                        <td>{index + 1}</td>
                                        {QueueTableBody.map((item) => {
                                                return <td key={item}>
                                                    {body[item]}
                                                </td>
                                            }
                                        )}
                                        <td>
                                            <Link className="text-success font-weight-bold" to={{
                                                pathname: `${invoicesURL.invoice}/${invoicesURL.invoiceForm}/${body["patient"].id}`,
                                                state: {
                                                    patient: body["patientFullName"],
                                                    employeeId: body["employee"].id
                                                }
                                            }}>Charge Patient</Link>
                                        </td>
                                        <td>
                                            <button className="delete-button"
                                                    onClick={() => deletePatientFromQueueMethod(body.id)}>delete
                                            </button>
                                        </td>

                                    </tr>
                                )
                                }

                                </tbody>
                            </table>

                        </div>
                    } else {
                        delete waitingQueue[key]
                    }
                }
            )
        }
    </div>;
}

export default WaitingQueueList;