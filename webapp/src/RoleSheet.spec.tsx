import { render, screen } from "@testing-library/react";
import React from "react";
import { Player } from "./model/Player";
import { RoleSheet } from "./RoleSheet";
import { Role, levels, roles } from "./model/Roles";


const firstLevelRoles = levels[0].map((name) => roles[name]);

firstLevelRoles.forEach((role) => it(`${role.name} does show all role skills`, () => {
  render(<RoleSheet role={role.name as Role} player={new Player("Roger")} scorePoints={() => { }} />);

  role.todos.forEach(todo => expect(screen.getByText(todo)).toBeInTheDocument())
}))
