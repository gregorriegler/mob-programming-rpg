import React, { useState } from "react";
import { Player, Role } from "./model/Player";


const PlayerDisplay = (props) => {

    const [player, setPlayer] = useState(new Player(props.playerName))
    const [uiState, setUiState] = useState({addingPointsFor: []})

    function selectRole(e) {
        e.preventDefault();
        const role = new FormData(e.target).get("role") as Role;
        player.selectRole(role);
        setPlayer(Object.create(player))
    }

    return <li key={player.name()} aria-label={player.name()}>
        <h2>{props.playerName} ({props.role})</h2>
        {player.roles().map(role => {
            return <RolePoints key={role} role={role} player={player} setPlayer={setPlayer} uiState={uiState}
                               setUiState={setUiState}/>
        })}
        {player.selectableRoles().length > 0 &&
          <form onSubmit={selectRole}>
            <label>
              Available Roles
              <select name="role">
                  {player.selectableRoles().map(role =>
                      <option key={role} value={role}>{role}</option>)
                  }
              </select>
            </label>
            <button type="submit">Select</button>
          </form>
        }
    </li>
}

function RolePoints(props) {
    function showRolePointsForm(role: string) {
        return () =>
            props.setUiState({
                addingPointsFor: [...props.uiState.addingPointsFor, role]
            });
    }

    function addDriverPoints(e) {
        e.preventDefault();
        const amount = new FormData(e.target).get("amount") as String;
        props.player.scoreTimes(props.role, amount);
        props.setUiState({
            addingPointsFor: props.uiState.addingPointsFor.filter(it => it !== props.role)
        });
        props.setPlayer(Object.create(props.player))
    }

    return <div className="role">
        <label className="role-label">
            {props.role}
            <input disabled={true} value={props.player.pointsFor(props.role)}/>
        </label>
        <button onClick={showRolePointsForm(props.role)}>
            Add {props.role} Points
        </button>
        {props.uiState.addingPointsFor.includes(props.role) &&
          <form className="add-points-form" onSubmit={addDriverPoints}>
            <label>
              Add Points
              <input type="text" name="amount" defaultValue="0"/>
            </label>
            <button type="submit">Add</button>
          </form>
        }
        {props.player.hasBadge(props.role) &&
          <span>{props.role} Badge</span>
        }
    </div>
}

export default PlayerDisplay;