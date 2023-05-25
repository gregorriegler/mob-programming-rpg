import React, { useEffect } from "react";
import { Player } from "./model/Player";

export function SelectRole({ player }: { player: Player; }): JSX.Element {
  useEffect(() => {
    // @ts-ignore
    if (window.RPGUI !== undefined) {
      const selectElement = document.getElementById(
        player.name + "-role-select"
      );
      if (selectElement!!.getAttribute("data-rpguitype") === "dropdown")
        return;
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
