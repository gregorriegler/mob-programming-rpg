import React, { useEffect, useState } from "react";
import { Role } from "./model/Roles";
import { noOp } from "./model/Func";
import { Player } from "./model/Player";
import { RolePoints } from "./RolePoints";
import { Badge } from "./Badge";

const PlayerDisplay = ({
  player,
  updateGameState = noOp,
  position = "Mobber"  
}: {
  player: Player;
  updateGameState?: () => void;
  position?: string;
}) => {
  const [uiState, setUiState] = useState({ addingPointsFor: [] });

  function selectRole(event: any) {
    const role = new FormData(event.target).get("role") as Role;
    player.selectRole(role);
    updateGameState();
    setUiState({ addingPointsFor: [] });
    event.preventDefault();
  }

  return (
    <li
      className="player rpgui-container framed-golden"
      aria-label={player.name}
    >
      <h2>{position}</h2>
      <h2>
        <img
          className="avatar"
          src={`${process.env.PUBLIC_URL}/img/avatars/${player.avatar}.png`}
          alt={player.avatar}
        />
        {player.name}
      </h2>

      {player.badges.map((role) => (
        <Badge key={role} role={role} />
      ))}
      {player.badges.length < 4 &&
        Array.from(Array(4 - player.badges.length).keys()).map(
          (item, index) => <div key={index} className="rpgui-icon magic-slot" />
        )}
      {player.roles.map((role) => (
        <RolePoints
          key={role}
          role={role}
          player={player}
          updateGame={updateGameState}
          uiState={uiState}
          setUiState={setUiState}
        />
      ))}
      {player.selectableRoles().length > 0 && (
        <form onSubmit={selectRole}>
          <label>
            Available Roles
            <SelectRole player={player} />
          </label>
          <button className="rpgui-button" type="submit">
            <p>Select</p>
          </button>
        </form>
      )}
    </li>
  );
};

function SelectRole({ player }: { player: Player }): JSX.Element {
  useEffect(() => {
    // @ts-ignore
    if (window.RPGUI !== undefined) {
      const selectElement = document.getElementById(
        player.name + "-role-select"
      );
      if (selectElement!!.getAttribute("data-rpguitype") === "dropdown") return;
      // @ts-ignore
      window.RPGUI.create(selectElement, "dropdown");
    }
  }, [player]);

  return (
    <>
      <select
        name="role"
        id={player.name + "-role-select"}
        className="rpgui-dropdown"
      >
        {player.selectableRoles().map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </>
  );
}

export default PlayerDisplay;
