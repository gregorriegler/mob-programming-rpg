import React, { useState } from "react";
import { Role } from "./model/Player";


const PlayerDisplay = ({player, updateGame = ()=> {}, role = "Driver"}) => {

    const [uiState, setUiState] = useState({addingPointsFor: []})

    function selectRole(e) {
        e.preventDefault();
        const role = new FormData(e.target).get("role") as Role;
        player.selectRole(role);
        updateGame();
        setUiState({addingPointsFor: []});
    }

    return <li className="player rpgui-container framed-golden" key={player.name()} aria-label={player.name()}>
        <h2>{player.name()} ({role})</h2>
        {player.roles().map(role => {
            return <RolePoints key={role} role={role} player={player} updateGame={updateGame} uiState={uiState}
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

function RolePoints({player, role, setUiState, uiState, updateGame}) {
    function showRolePointsForm(role: string) {
        return () =>
            setUiState({
                addingPointsFor: [...uiState.addingPointsFor, role]
            });
    }

    function addDriverPoints(e) {
        e.preventDefault();
        const amount = new FormData(e.target).get("amount") as String;
        player.scoreTimes(role, amount);
        setUiState({
            addingPointsFor: uiState.addingPointsFor.filter(it => it !== role)
        });
        updateGame();
    }

    return <div className="role">
        <hr/>
        <label className="role-label">
            {role}
            <input disabled={true} className="role-points" value={player.pointsFor(role)}/>
        </label>
        <button onClick={showRolePointsForm(role)} className="rpgui-button add-points-button"
                aria-label={"Add " + role + " Points"}><p>Earn</p></button>
        {uiState.addingPointsFor.includes(role) &&
          <form className="add-points-form" onSubmit={addDriverPoints}>
            <label>
              Add Points
              <input className="add-points-input" type="text" name="amount" defaultValue="0"/>
            </label>
            <button className="rpgui-button" type="submit"><p>Add</p></button>
          </form>
        }
        {player.hasBadge(role) &&
          <span>{role} Badge</span>
        }
    </div>
}

export default PlayerDisplay;