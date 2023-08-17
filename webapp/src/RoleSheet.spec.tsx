import { render, screen } from "@testing-library/react";
import React from "react";
import { Player } from "./model/Player";
import { RoleSheet } from "./RoleSheet";

it('driver does show driver skills', () => {
    render(<RoleSheet player={new Player("Roger")} role="Driver" scorePoints={()=>{}}/>);
    expect(screen.getByText("Ask a clarifying question about what to type")).toBeInTheDocument()
    expect(screen.getByText("Ignore a direct instruction from someone who isn't the Navigator")).toBeInTheDocument()
})

it('navigator does not show driver skills', () => {
    render(<RoleSheet player={new Player("Roger")} role="Navigator" scorePoints={()=>{}}/>);
    expect(screen.queryByText("Ask a clarifying question about what to type")).toBeNull();
})
