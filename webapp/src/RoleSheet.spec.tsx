import { render, screen } from "@testing-library/react";
import React from "react";
import { Player } from "./model/Player";
import { RoleSheet } from "./RoleSheet";
import { roles } from "./model/Roles";

const role = roles.Driver;

it('driver does show all driver skills', () => {
  render(<RoleSheet player={new Player("Roger")} role={role.name} scorePoints={() => { }} />);
  role.todos.forEach(todo => expect(screen.getByText(todo)).toBeInTheDocument())
})

it('navigator does not show driver skills', () => {
  render(<RoleSheet player={new Player("Roger")} role="Navigator" scorePoints={() => { }} />);
  expect(screen.queryByText("Ask a clarifying question about what to type")).toBeNull();
})
