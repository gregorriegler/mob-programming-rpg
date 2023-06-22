import React from "react";

export function EarnPointsForRoleForm({ onSubmit: earnDriverPoints }: { onSubmit: (e: any) => void; }): JSX.Element {
    return (
        <form className="add-points-form" onSubmit={earnDriverPoints}>
            <label>
                Add Points
                <input
                    className="add-points-input"
                    type="text"
                    name="amount"
                    defaultValue="0" />
            </label>
            <button className="rpgui-button" type="submit">
                <p>Add</p>
            </button>
        </form>
    );
}
