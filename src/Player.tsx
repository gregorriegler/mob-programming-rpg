import React, { useState } from "react";
import { Participant, Role } from "./model/Participant";


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
        <button onClick={showRolePointsForm(props.role)}>Add {props.role} Points</button>
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

    function selectRole(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const role = formData.get("role") as Role;
        playerState.player.selectRole(role)
        setPlayerState({
            player: Object.create(playerState.player),
            addingPointsFor: playerState.addingPointsFor
        });
    }

    return <li key={playerState.player.name()} aria-label={playerState.player.name()}>
        {props.playerName}<br/>
        {playerState.player.roles().map(role => {
            return <RolePoints key={role} role={role} playerState={playerState} setPlayerState={setPlayerState}/>
        })}
        {playerState.player.canSelectRole() && <button>select next role</button>}
        <form onSubmit={selectRole}>
            <label>Available Roles
                <select name="role">
                    <option value="Researcher">Researcher</option>
                </select>
            </label>
            <button type="submit">Select</button>
        </form>
    </li>
}

export default Player;