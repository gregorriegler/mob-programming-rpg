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
        expect(screen.getByLabelText('Driver')).toHaveValue("0");
    });

    it('earns Driver Badge', () => {
        render(<Player playerName={"Roger"}/>);
        const driverPoints = screen.getByLabelText('Driver');
        fireEvent.change(driverPoints, {target: {value: "3"}})
        expect(screen.getByText('Driver Badge')).toBeInTheDocument();
    });
})
