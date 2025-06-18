import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Player } from "./model/Player";
import { RoleSheet } from "./RoleSheet";
import { Role, levels, roles } from "./model/Roles";


describe('RoleSheet', () => {
    it(`shows Typing todos when in Typing position`, () => {
        render(<RoleSheet role="Typing" position="Typing" player={new Player("Roger")} scorePoints={() => { }} />);

        roles["Typing"].todos.forEach(todo => expect(screen.getByText(todo)).toBeInTheDocument())
    });

    it(`shows Talking todos when in Talking position`, () => {
        render(<RoleSheet role="Talking" position="Talking" player={new Player("Roger")} scorePoints={() => { }} />);

        roles["Talking"].todos.forEach(todo => expect(screen.getByText(todo)).toBeInTheDocument())
    });

    it(`shows Observing todos when in Observing position`, () => {
        render(<RoleSheet role="Observing" position="Observing" player={new Player("Roger")} scorePoints={() => { }} />);

        roles["Observing"].todos.forEach(todo => expect(screen.getByText(todo)).toBeInTheDocument())
    });

    it(`scores a single point using the checkboxes when submitting`, async () => {
        const mockScorePoints = jest.fn();
        render(<RoleSheet role="Typing" position="Typing" player={new Player("Roger")} scorePoints={mockScorePoints} />);
        await checkTodo('Typing-0');

        await clickEarnPoints();
        
        expect(mockScorePoints).toHaveBeenCalledWith("Typing", 1);
    })

    it(`scores two points using the checkboxes when submitting`, async () => {
        const mockScorePoints = jest.fn();
        render(<RoleSheet role="Typing" position="Typing" player={new Player("Roger")} scorePoints={mockScorePoints} />);
        await checkTodo('Typing-0');
        await checkTodo('Typing-1');

        await clickEarnPoints();
        
        expect(mockScorePoints).toHaveBeenCalledWith("Typing", 2);
    })

    it(`scores two points Talking using the checkboxes when submitting`, async () => {
        const mockScorePoints = jest.fn();
        render(<RoleSheet role="Talking" position="Talking" player={new Player("Roger")} scorePoints={mockScorePoints} />);
        await checkTodo('Talking-0');
        await checkTodo('Talking-1');

        await clickEarnPoints();
        
        expect(mockScorePoints).toHaveBeenCalledWith("Talking", 2);
    })
})


async function checkTodo(todo) {
    const firstCheckbox = document.getElementById(todo) as HTMLInputElement;
    await act(async () => {
        userEvent.click(firstCheckbox);
    });
}

async function clickEarnPoints() {
    const submitButton = screen.getByRole('button', { name: /Earn Points/ });
    await act(async () => {
        userEvent.click(submitButton);
    });
}

// TODO if canEarnPoints for role, show skills of role
// cannot rotate until players have filled the form
// TODO use it.each ??? but maybe its too clever?
// rename role.todo to skills (might be used in other places)
// now we use <div>, but its semantically a list (should use <li>)
