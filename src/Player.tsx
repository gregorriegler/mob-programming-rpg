import React, { useState } from "react";
import { Participant } from "./model/Participant";

const Player = (props) => {
    const [participant, setParticipant] = useState(new Participant(props.playerName))

    function changePoints(e) {
        participant.scoreTimes("Driver", e.target.value);
        // TODO participant immutable!?
        // TODO save everything in local storage or its gone after refresh
        setParticipant(Object.create(participant));
    }

    return <li title={participant.name()}>
        {props.playerName}
        <label>Driver<input onChange={changePoints} defaultValue={participant.pointsFor("Driver")}/></label>
        {participant.hasBadge("Driver") && <span>Driver Badge</span>}
    </li>
}

export default Player;