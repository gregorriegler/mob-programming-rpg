import PlayerDisplay from "./PlayerDisplay";
import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";

describe('PlayerDisplay', () => {
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

        pointsDisplay(role: string) {
            return screen.getByLabelText(role);
        }
        
        selectNextRole() {
            return screen.queryByRole(/available roles/i);
        }
    }

    const player = new PlayerComponent();

    it('shows the players name', () => {
        render(<PlayerDisplay playerName={"Roger"}/>);
        expect(screen.getByRole('listitem')).toHaveTextContent("Roger");
    });

    it('shows the initial points', () => {
        render(<PlayerDisplay playerName={"Roger"}/>);

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
        render(<PlayerDisplay playerName={"Roger"}/>);
        player.clickAddPoints('Driver');
        expect(player.addPointsInput()).toBeInTheDocument();
        expect(player.addPointsInput()).toHaveValue("0");
        player.enterAddPointsForm("2");
        expect(player.pointsDisplay('Driver')).toHaveValue("2");
        expect(player.addPointsInput()).not.toBeInTheDocument();
    });

    it('adds up points', () => {
        render(<PlayerDisplay playerName={"Roger"}/>);
        player.clickAddPoints('Driver');
        player.enterAddPointsForm("1");
        expect(player.pointsDisplay('Driver')).toHaveValue("1");

        player.clickAddPoints('Driver');
        player.enterAddPointsForm("2");

        expect(player.pointsDisplay('Driver')).toHaveValue("3");
        expect(screen.getByText('Driver Badge')).toBeInTheDocument();
    });

    it('cannot select a new role before having a badge', () => {
        render(<PlayerDisplay playerName={"Roger"}/>);
        
        expect(player.selectNextRole()).not.toBeInTheDocument()
    });

    it('can select a new role after earning a badge', () => {
        render(<PlayerDisplay playerName={"Roger"}/>);
        player.clickAddPoints("Navigator");
        player.enterAddPointsForm("3");

        expect(screen.getByText('Navigator Badge')).toBeInTheDocument();
        expect(screen.getByRole('listitem', {name: /Roger/i})).toBeInTheDocument();

        const availableRoles = screen.getByLabelText(/available roles/i);
        expect(availableRoles).toBeInTheDocument()
        const researcherOption = within(availableRoles).getByRole('option', {name: /researcher/i});
        fireEvent.select(researcherOption)
        userEvent.selectOptions(
            availableRoles,
            researcherOption
        )
        fireEvent.click(screen.getByText("Select"));
        expect(player.pointsDisplay("Researcher")).toBeInTheDocument();
        expect(player.selectNextRole()).not.toBeInTheDocument()
    });

})