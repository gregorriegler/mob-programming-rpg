import Player from "./Player";
import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";

describe('Player', () => {
    class PlayerComponent {
        addPointsButton(role) {
            return screen.getByRole('button', {name: new RegExp(`Add ${role} Points`)});
        }

        clickAddPoints(role: string) {
            fireEvent.click(player.addPointsButton(role));
        }

        addPointsInput() {
            return screen.queryByLabelText('Add Points');
        }

        enterAddPointsForm(value: string) {
            fireEvent.change(this.addPointsInput(), {target: {value: value}})
            fireEvent.click(screen.getByText('Add'));
        }

        pointsDisplay(driver: string) {
            return screen.getByLabelText(driver);
        }

        selectNextRoleButton() {
            return within(screen.getByRole('listitem', {name: /Roger/i}))
                .queryByRole('button', {name: /select next role/i});
        }
    }


    const player = new PlayerComponent();


    it('shows their name', () => {
        render(<Player playerName={"Roger"}/>);
        expect(screen.getByRole('listitem')).toHaveTextContent("Roger");
    });

    it('shows initial points', () => {
        render(<Player playerName={"Roger"}/>);

        function roleInitialized(role: string) {
            const driverPoints = screen.getByLabelText(role);
            expect(driverPoints).toHaveValue("0");
            expect(driverPoints).toBeDisabled();
        }

        roleInitialized('Driver');
        roleInitialized('Navigator');
        roleInitialized('Mobber');
    });

    it('adds driver points', () => {
        render(<Player playerName={"Roger"}/>);
        player.clickAddPoints('Driver');
        expect(player.addPointsInput()).toBeInTheDocument();
        expect(player.addPointsInput()).toHaveValue("0");
        player.enterAddPointsForm("2");
        expect(player.pointsDisplay('Driver')).toHaveValue("2");
        expect(player.addPointsInput()).not.toBeInTheDocument();
    });

    it('adds up points', () => {
        render(<Player playerName={"Roger"}/>);
        player.clickAddPoints('Driver');
        player.enterAddPointsForm("1");
        expect(player.pointsDisplay('Driver')).toHaveValue("1");

        player.clickAddPoints('Driver');
        player.enterAddPointsForm("2");


        expect(player.pointsDisplay('Driver')).toHaveValue("3");

        expect(screen.getByText('Driver Badge')).toBeInTheDocument();
    });

    it('cannot select a new role before having a badge', () => {
        render(<Player playerName={"Roger"}/>);
        expect(player.selectNextRoleButton()).not.toBeInTheDocument();

    });

    it('can select a new role after earning a badge', () => {
        render(<Player playerName={"Roger"}/>);
        player.clickAddPoints("Navigator");
        player.enterAddPointsForm("3");

        expect(screen.getByText('Navigator Badge')).toBeInTheDocument();
        const byRole = screen.getByRole('listitem', {name: /Roger/i});
        expect(byRole).toBeInTheDocument();
        const selectNextRoleButton = within(byRole).getByRole('button', {name: /select next role/i});
        expect(selectNextRoleButton).toBeInTheDocument();
        //todo add new role   
    });

})