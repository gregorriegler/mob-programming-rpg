import MobProgrammingRPG from "./MobProgrammingRPG";
import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";

describe('Mob Programming RPG', () => {

    function getPlayerListitems() {
        const playerList = screen.getByRole('list', {name: /Player List/});
        return within(playerList).getAllByRole("listitem");
    }

    function getSettingsButton() {
        return screen.queryByRole('button', {name: 'Settings'});
    }

    function getRotateButton() {
        return screen.queryByRole('button', {name: 'Rotate'});
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

        fireEvent.change(playersTextarea, {target: {value: 'Gregor,Max,Rita'}});
        fireEvent.click(screen.getByText("Save"));
        
        const items = getPlayerListitems();
        expect(items.length).toBe(3);
        expect(items[0]).toHaveTextContent('Gregor');
        expect(items[1]).toHaveTextContent('Max');
        expect(items[2]).toHaveTextContent('Rita');
    })

    it('shows playing players in settings', () => {
        render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter"]}/>);
        
        fireEvent.click(getSettingsButton());

        expect(screen.getByLabelText('Change Players')).toHaveTextContent("Gregor, Peter");
    })

    it('shows players roles', () => {
        render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter", "Rita"]}/>);

        const items = getPlayerListitems();
        expect(items[0]).toHaveTextContent('Gregor (Driver)');
        expect(items[1]).toHaveTextContent('Peter (Navigator)');
        expect(items[2]).toHaveTextContent('Rita (Next)');
    })

    it('has a rotate button that rotates the players', () => {
        render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter", "Rita"]}/>);

        fireEvent.click(getRotateButton());

        const items = getPlayerListitems();
        expect(items[0]).toHaveTextContent('Gregor (Next)');
        expect(items[1]).toHaveTextContent('Peter (Driver)');
        expect(items[2]).toHaveTextContent('Rita (Navigator)');
    })
})
