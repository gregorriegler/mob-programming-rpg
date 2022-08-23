import React, { useState } from "react";
import { Participant } from "./model/Participant";

const Player = (props) => {
    const [playerState, setPlayerState] = useState({
        player: new Participant(props.playerName),
        addingPointsFor: []
    })

    function addDriverPoints(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const amount = formData.get("amount") as String;
        playerState.player.scoreTimes("Driver", amount);
        // TODO participant immutable!?
        // TODO save everything in local storage or its gone after refresh
        setPlayerState({
            player: Object.create(playerState.player),
            addingPointsFor: playerState.addingPointsFor.filter(it => it !== "Driver")
        });
    }

    function showAddDriverPointsForm() {
        setPlayerState({
                ...playerState,
                addingPointsFor: [...playerState.addingPointsFor, "Driver"]
            });
    }

    return <li title={playerState.player.name()}>
        {props.playerName}<br/>
        <label>Driver<input disabled={true} value={playerState.player.pointsFor("Driver")}/></label>
        <button onClick={showAddDriverPointsForm}>Add Points</button>
        {playerState.addingPointsFor.includes("Driver") &&
          <form onSubmit={addDriverPoints}><label>Add Points<input type="text" name="amount" defaultValue="0"/></label>
            <button type="submit">Add</button>
          </form>
        }
        {playerState.player.hasBadge("Driver") && <span>Driver Badge</span>}
    </li>
}

export default Player;