import React, { useState } from "react";
import { Role } from "./model/Roles";
import { noOp } from "./model/Func";
import { Player } from "./model/Player";
import { RoleSheet } from "./RoleSheet";
import { Badge } from "./Badge";
import { SelectRole } from "./SelectRole";

const PlayerDisplay = ({
  player: _player,
  updateGameState = noOp,
  position = "Mobber"
}: {
  player: Player;
  updateGameState?: () => void;
  position?: string;
}) => {

  const [player, setPlayer] = useState(_player);

  function submitSelectRoleForm(event: any) {
    const role = new FormData(event.target).get("role") as Role;
    selectRole(role);
    event.preventDefault();
  }

  function selectRole(role: Role) {
    player.selectRole(role);
    setPlayer(player.clone());
    updateGameState();
  }

  function scorePoints(role: Role, amount: number) {
    player.scoreTimes(role, amount);
    setPlayer(player.clone());
    updateGameState();
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
          (_, index) => <div key={index} className="rpgui-icon magic-slot" />
        )}
      {player.roles.map((role) => (
        <RoleSheet
          key={role}
          role={role}
          position={position}
          player={player}
          scorePoints={scorePoints}
        />
      ))}
      {player.selectableRoles().length > 0 && (
        <form onSubmit={submitSelectRoleForm}>
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

export default PlayerDisplay;
