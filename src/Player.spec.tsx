import Player from "./Player";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

describe('Player', () => {
    it('shows their name', () => {
        render(<Player playerName={"Roger"}/>);
        expect(screen.getByRole('listitem')).toHaveTextContent("Roger");
    });

    it('shows initial points', () => {
        render(<Player playerName={"Roger"}/>);
        const driverPoints = screen.getByLabelText('Driver');
        expect(driverPoints).toHaveValue("0");
        expect(driverPoints).toBeDisabled();
    });

    it('adds driver points', () => {
        render(<Player playerName={"Roger"}/>);
        const addDriverPoints = screen.getByRole('button', {name: /Add Points/i});
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
        const addDriverPoints = screen.getByRole('button', {name: /Add Points/i});
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
})
