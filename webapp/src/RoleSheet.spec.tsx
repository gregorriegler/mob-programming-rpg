import { render, screen } from "@testing-library/react";
import React from "react";
import { Player } from "./model/Player";
import { RoleSheet } from "./RoleSheet";
import { Role, levels, roles } from "./model/Roles";


describe('RoleSheet', () => {
    it(`shows Typing skills when in Typing position`, () => {
        render(<RoleSheet role="Typing" position="Typing" player={new Player("Roger")} scorePoints={() => { }} />);

        roles["Typing"].todos.forEach(todo => expect(screen.getByText(todo)).toBeInTheDocument())
    });

    it(`shows Talking skills when in Talking position`, () => {
        render(<RoleSheet role="Talking" position="Talking" player={new Player("Roger")} scorePoints={() => { }} />);

        roles["Talking"].todos.forEach(todo => expect(screen.getByText(todo)).toBeInTheDocument())
    });

    it(`shows Observing skills when in Observing position`, () => {
        render(<RoleSheet role="Observing" position="Observing" player={new Player("Roger")} scorePoints={() => { }} />);

        roles["Observing"].todos.forEach(todo => expect(screen.getByText(todo)).toBeInTheDocument())
    });
})

// TODO if canEarnPoints for role, show skills of role
// cannot rotate until players have filled the form
// TODO use it.each ??? but maybe its too clever?
// rename role.todo to skills (might be used in other places)
// now we use <div>, but its semantically a list (should use <li>)
