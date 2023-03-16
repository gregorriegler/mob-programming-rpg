import { ByRoleOptions, screen, within } from "@testing-library/react";

export function getButton(options?: ByRoleOptions | undefined) {
    return screen.getByRole("button", options);
}

export function withinElementGetButton(element: HTMLElement, options?: ByRoleOptions | undefined) {
    return within(element).getByRole("button", options);
}