import React, { useState } from "react";
import { Participant } from "./model/Participant";


function RolePoints(props) {
    function showRolePointsForm(role: string) {
        return () =>
            props.setPlayerState({
                ...props.playerState,
                addingPointsFor: [...props.playerState.addingPointsFor, role]
            });
    }

    function addDriverPoints(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const amount = formData.get("amount") as String;
        props.playerState.player.scoreTimes(props.role, amount);
        // TODO participant immutable!?
        // TODO save everything in local storage or its gone after refresh
        props.setPlayerState({
            player: Object.create(props.playerState.player),
            addingPointsFor: props.playerState.addingPointsFor.filter(it => it !== props.role)
        });
    }

    return <>
        <label>{props.role}<input disabled={true} value={props.playerState.player.pointsFor(props.role)}/></label>
        <button onClick={showRolePointsForm(props.role)}>Add Points</button>
        {props.playerState.addingPointsFor.includes(props.role) &&
          <form onSubmit={addDriverPoints}><label>Add Points<input type="text" name="amount" defaultValue="0"/></label>
            <button type="submit">Add</button>
          </form>
        }
        {props.playerState.player.hasBadge(props.role) && <span>{props.role} Badge</span>}
    </>
}

const Player = (props) => {

    const [playerState, setPlayerState] = useState({
        player: new Participant(props.playerName),
        addingPointsFor: []
    })

    return <li title={playerState.player.name()}>
        {props.playerName}<br/>
        <RolePoints role="Driver" playerState={playerState} setPlayerState={setPlayerState}/>
        <RolePoints role="Navigator" playerState={playerState} setPlayerState={setPlayerState}/>
    </li>
}

export default Player;