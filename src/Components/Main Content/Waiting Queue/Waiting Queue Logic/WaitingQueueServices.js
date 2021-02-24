import api from '../../../Re-usable/Api Url/apiURL'
import {webApiURL} from "../../../../Constants/URLConstants";

export const postPatientToQueueService =async (queue ) =>  {

    try {
     return  await api.post(webApiURL.waitingQueue.postPatientToWaitingQueue, queue)
    } catch (e) {
return e.response.data
    }
}

export const getAllQueuesService = async() =>   {

    try {
        const res = await api.get("/queue/all")
      return res.data

    } catch (e) {
    }
}


export const deletePatientFromWaitingQueue=async (id) =>   {

    try {
    const res=   await  api.delete(webApiURL.waitingQueue.deletePatientFromWaitingQueue+id)
    return res;
    } catch (e) {
        return e.response.data

    }
}