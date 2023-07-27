import PlayerDisplay from "./PlayerDisplay";
import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { Player } from "./model/Player";
import { act } from "react-dom/test-utils";
import { RoleSheet } from "./RoleSheet";
import { EarnPointsForRoleForm } from "./EarnPointsForRoleForm";

it('shows skills per role', () => {
    render(<RoleSheet player={new Player("Roger")} role="Driver" scorePoints={()=>{}}/>);
    expect(screen.getByText("Ask a clarifying question about what to type")).toBeInTheDocument()
})

it('navigator doesn\'t show driver skills', () => {
    render(<RoleSheet player={new Player("Roger")} role="Navigator" scorePoints={()=>{}}/>);
    expect(screen.getByText("Ask a clarifying question about what to type")).not.toBeInTheDocument()
})
