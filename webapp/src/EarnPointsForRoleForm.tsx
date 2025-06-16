import React from "react";

export function EarnPointsForRoleForm({ onSubmit: earnRolePoints }: { onSubmit: (e: any) => void; }): JSX.Element {
    return (
        <form className="add-points-form" onSubmit={earnRolePoints}>
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
