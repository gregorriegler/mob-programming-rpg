import { render, screen } from "@testing-library/react";
import React from "react";
import { Player } from "./model/Player";
import { RoleSheet } from "./RoleSheet";
import { Role, levels, roles } from "./model/Roles";


describe('RoleSheet', () => {
    const firstLevelRoles = levels[0].map((name) => roles[name]);
    firstLevelRoles.forEach((role) => it(`shows skills for the ${role.name} role`, () => {
        render(<RoleSheet role={role.name as Role} player={new Player("Roger")} scorePoints={() => { }} />);

        role.todos.forEach(todo => expect(screen.getByText(todo)).toBeInTheDocument())
    }))
})

// TODO if canEarnPoints for role, show skills of role
// cannot rotate until players have filled the form
// TODO use it.each ??? but maybe its too clever?
// rename role.todo to skills (might be used in other places)
// now we use <div>, but its semantically a list (should use <li>)
