import { ByRoleOptions, screen } from "@testing-library/react";

export function getButton(options?: ByRoleOptions | undefined) {
    return screen.getByRole("button", options);
}