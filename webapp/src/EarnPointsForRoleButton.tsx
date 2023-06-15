import React from "react";

// naming - "earn points" ("...for role"?)

export function EarnPointsForRoleButton({ onClick: earnPointsForRole, role }: { onClick: (role: string) => () => any; role: string; }) {
    return (
        <button
            onClick={earnPointsForRole(role)}
            className="rpgui-button add-points-button"
            aria-label={"Add " + role + " Points"}>
            <p>Earn</p>
        </button>
    );
}
