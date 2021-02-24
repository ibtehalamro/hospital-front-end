import React from 'react';
import {waitingQueueURLs} from "../../../Constants/URLConstants";
import WaitingQueueMain from "./WaitingQueueMain";
import WaitingQueueList from "./WaitingQueueList";
import {Route, useRouteMatch} from "react-router";

const WaitingQueueRouter = () => {
    const match = useRouteMatch();
    return (
        <div>
            <Route exact path={`${match.url}/${waitingQueueURLs.waitingQueueForm}`} component={WaitingQueueMain}/>
            <Route exact path={`${match.url}/${waitingQueueURLs.waitingQueueList}`} component={WaitingQueueList}/>
        </div>
    );
};

export default WaitingQueueRouter;