import React, { useEffect, useState } from "react";
import { Role } from "./model/Roles";
import { noOp } from "./model/Func";
import { Player } from "./model/Player";
import { RolePoints } from "./RolePoints";

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

const Badge = ({ role }: any) => {
  function badgeSource(role: Role) {
    const images = {
      Driver: "driver-badge.png",
      Navigator: "navigator-badge.png",
      Mobber: "mobber-badge.png",
      Researcher: "researcher-badge.png",
      Sponsor: "sponsor-badge.png",
      "Rear Admiral": "rear-admiral-badge.png",
      Automationist: "automationist-badge.png",
      Nose: "nose-badge.png",
      Archivist: "archivist-badge.png",
      "Traffic Cop": "traffic-cop-badge.png",
      Disciplinarian: "disciplinarian-badge.png",
    };
    return `${process.env.PUBLIC_URL}/img/icons/${images[role]}`;
  }

  return (
    <div className="rpgui-icon magic-slot">
      {role !== undefined && (
        <img
          src={badgeSource(role)}
          alt={role + " Badge"}
          aria-label={role + " Badge"}
        />
      )}
    </div>
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
