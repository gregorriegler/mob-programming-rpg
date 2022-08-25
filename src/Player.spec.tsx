import Player from "./Player";
import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";

describe('Player', () => {
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
        const addDriverPoints = screen.getByRole('button', {name: /Add Driver Points/i});
        fireEvent.click(addDriverPoints);
        const howMany = screen.getByLabelText('Add Points');
        expect(howMany).toBeInTheDocument();
        expect(howMany).toHaveValue("0");
        fireEvent.change(howMany, {target: {value: "2"}})
        fireEvent.click(screen.getByText('Add'));
        expect(screen.getByLabelText('Driver')).toHaveValue("2");
        expect(howMany).not.toBeInTheDocument();
    });

    it('adds up points', () => {
        render(<Player playerName={"Roger"}/>);
        const addDriverPoints = screen.getByRole('button', {name: /Add Driver Points/i});
        fireEvent.click(addDriverPoints);
        fireEvent.change(screen.getByLabelText('Add Points'), {target: {value: "1"}})
        fireEvent.click(screen.getByText('Add'));
        expect(screen.getByLabelText('Driver')).toHaveValue("1");

        fireEvent.click(addDriverPoints);
        fireEvent.change(screen.getByLabelText('Add Points'), {target: {value: "2"}})
        fireEvent.click(screen.getByText('Add'));
        expect(screen.getByLabelText('Driver')).toHaveValue("3");

        expect(screen.getByText('Driver Badge')).toBeInTheDocument();
    });
    
    it('cannot select a new role before having a badge', () => {
        render(<Player playerName={"Roger"}/>);
        const selectNextRoleButton = within(screen.getByRole('listitem', {name: /Roger/i}))
            .queryByRole('button', {name: /select next role/i});
        expect(selectNextRoleButton).not.toBeInTheDocument();
        
    });
    
    it('can select a new role after earning a badge', () => {
        render(<Player playerName={"Roger"}/>);
        fireEvent.click(screen.getByRole('button', {name: /Add Navigator Points/i}));
        fireEvent.change(screen.getByLabelText('Add Points'), {target: {value: "3"}})
        fireEvent.click(screen.getByText('Add'));

        expect(screen.getByText('Navigator Badge')).toBeInTheDocument();
        const byRole = screen.getByRole('listitem', {name: /Roger/i});
        expect(byRole).toBeInTheDocument();
        const selectNextRoleButton = within(byRole).getByRole('button', {name: /select next role/i});
        expect(selectNextRoleButton).toBeInTheDocument();
        //todo add new role   
    });
})