import React, { useEffect, useState } from "react";
import { Role } from "./model/Player";


function SelectRole({player}) {
    useEffect(() => {
        // @ts-ignore
        if(window.RPGUI !== undefined) {
            console.log("make dropdown")
            // @ts-ignore
            window.RPGUI.create(document.getElementById(player.name() + "-role-select"), "dropdown")
        }
    }, [player]);
    return <>
              <select name="role" id={player.name() + "-role-select"} className="rpgui-dropdown">
                  {player.selectableRoles().map(role =>
                      <option key={role} value={role}>{role}</option>)
                  }
              </select>
        </>
}

const PlayerDisplay = ({player, updateGame = () => {}, role = "Mobber"}) => {

    const [uiState, setUiState] = useState({addingPointsFor: []})

    function selectRole(e) {
        e.preventDefault();
        const role = new FormData(e.target).get("role") as Role;
        player.selectRole(role);
        updateGame();
        setUiState({addingPointsFor: []});
    }


    return <li className="player rpgui-container framed-golden" aria-label={player.name()}>
        <h2>{player.name()} ({role})</h2>
        {player.badges().map(badge => {
            return <p key={badge}>{badge} Badge</p>
        })}
        {player.roles().map(role => {
            return <RolePoints key={role} role={role} player={player} updateGame={updateGame} uiState={uiState}
                               setUiState={setUiState}/>
        })}
        {player.selectableRoles().length > 0 &&
          <form onSubmit={selectRole}>
            <label>
              Available Roles
              <SelectRole player={player} />
            </label>
            <button className="rpgui-button" type="submit"><p>Select</p></button>
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
    </div>
}

export default PlayerDisplay;