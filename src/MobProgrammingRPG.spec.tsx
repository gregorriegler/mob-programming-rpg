import MobProgrammingRPG from "./MobProgrammingRPG";
import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";

describe('Mob Programming RPG', () => {
    function getSettingsButton() {
        return screen.queryByRole('button', {name: 'Settings'});
    }

    it('starts with an empty list of players', () => {
        render(<MobProgrammingRPG/>);
        const playerList = screen.getByRole('list', {name: /Player List/});
        expect(playerList).toBeEmptyDOMElement();
    });

    it('toggles the settings', () => {
        render(<MobProgrammingRPG/>);
        const settingsButton = getSettingsButton();
        fireEvent.click(settingsButton);
        fireEvent.click(settingsButton);

        const playersTextarea = screen.queryByText('Change Players');
        expect(playersTextarea).toBeNull();
    });

    it('changes players', () => {
        render(<MobProgrammingRPG/>);
        fireEvent.click(getSettingsButton());
        const playersTextarea = screen.getByLabelText('Change Players');
        expect(playersTextarea).toBeInTheDocument();

        fireEvent.change(playersTextarea, {target: {value: 'Gregor,Max'}});
        fireEvent.click(screen.getByText("Save"));

        const playerList = screen.getByRole('list', {name: /Player List/});
        const items = within(playerList).getAllByRole("listitem");
        const players = items.map(item => item.textContent);
        expect(players).toEqual(['Gregor', 'Max']);
    })
    
    it('shows playing players in settings', () => {
        render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter"]}/>);
        fireEvent.click(getSettingsButton());
        const playersTextarea = screen.getByLabelText('Change Players');
        
        expect(playersTextarea).toHaveTextContent("Gregor, Peter");
    })
})