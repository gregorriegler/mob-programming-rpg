import React from "react";

export function EarnButton({ showRolePointsForm, role }: { showRolePointsForm: (role: string) => () => any; role: string; }) {
    return (
        <button
            onClick={showRolePointsForm(role)}
            className="rpgui-button add-points-button"
            aria-label={"Add " + role + " Points"}>
            <p>Earn</p>
        </button>
    );
}
