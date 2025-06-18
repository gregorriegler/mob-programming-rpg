import PlayerDisplay from "./PlayerDisplay";
import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { Player } from "./model/Player";
import { act } from "react-dom/test-utils";

describe('PlayerDisplay', () => {
    class PlayerComponent {
        
        addPointsInput() {
            return screen.getByLabelText('Add Points');
        }

        async checkTodo(todo) {
            const checkbox = screen.getByRole('checkbox', { name: new RegExp(todo, 'i') });
            await act(async () => {
                await userEvent.click(checkbox);
            });
        }

        async clickEarnPoints() {
            const submitButton = screen.getByText('Earn');
            await act(async () => {
                await userEvent.click(submitButton);
            });
        }

        pointsDisplay(role: string) {
            return screen.getByLabelText(role);
        }

        selectNextRole() {
            return screen.queryByRole(/available roles/i);
        }
    }

    const player = new PlayerComponent();

    it('shows the players name', () => {
        render(<PlayerDisplay player={new Player("Roger")} position="Typing" />);
        expect(screen.getByRole('listitem')).toHaveTextContent("Roger");
    });

    it('shows the players role', () => {
        render(<PlayerDisplay player={new Player("Roger")} position="Typing" />);
        expect(screen.getByRole('listitem')).toHaveTextContent("Typing");
    });

    it('shows the initial points', () => {
        render(<PlayerDisplay player={new Player("Roger")} position="Typing" />);

        function roleInitialized(role: string) {
            const typerPoints = screen.getByLabelText(role);
            expect(typerPoints).toHaveValue("0");
            expect(typerPoints).toBeDisabled();
        }

        roleInitialized('Typing');
        roleInitialized('Talking');
        roleInitialized('Observing');
    });

    
    it('adds up points', async () => {
        render(<PlayerDisplay player={new Player("Roger")} position="Typing" />);
        await player.checkTodo("Ask a clarifying question about what to type");
        await player.checkTodo("Type something you disagree with");
        await player.checkTodo("Use a new keyboard shortcut");
        await player.clickEarnPoints();
        
        expect(player.pointsDisplay('Typing')).toHaveValue("3");
        expect(screen.getByAltText('Typing Badge')).toBeInTheDocument();
    });

    it('cannot select a new role before having a badge', () => {
        render(<PlayerDisplay player={new Player("Roger")} position="Typing" />);

        expect(player.selectNextRole()).not.toBeInTheDocument()
    });

    it('can select a new role after earning a badge', async () => {
        render(<PlayerDisplay player={new Player("Roger")} position="Typing" />);
        await player.checkTodo("Ask a clarifying question about what to type");
        await player.checkTodo("Type something you disagree with");
        await player.checkTodo("Use a new keyboard shortcut");
        await player.clickEarnPoints();
        
        expect(screen.getByAltText('Typing Badge')).toBeInTheDocument();
        expect(screen.getByRole('listitem', { name: /Roger/i })).toBeInTheDocument();

        const availableRoles = screen.getByLabelText(/available roles/i);
        expect(availableRoles).toBeInTheDocument()
        const researcherOption = within(availableRoles).getByRole('option', { name: /researcher/i });
        fireEvent.select(researcherOption)
        await userEvent.selectOptions(
            availableRoles,
            researcherOption
        )
        fireEvent.click(screen.getByText("Select"));
        expect(player.pointsDisplay("Researcher")).toBeInTheDocument();
        expect(player.selectNextRole()).not.toBeInTheDocument()
    });

})