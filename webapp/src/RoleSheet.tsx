import React from "react";
import { Role } from "./model/Roles";
import { Player } from "./model/Player";
import { ProgressBar } from "./ProgressBar";

type AppleSauce = {
    player: Player;
    role: Role;
    setUiState: any;
    uiState: any;
    updateGame: any;
    featureFlagShowSkillsPerRole?: boolean;
};

export function RoleSheet({
    player,
    role,
    setUiState,
    uiState,
    updateGame,
    featureFlagShowSkillsPerRole = !!process.env
        .REACT_APP_FEATURE_FLAG_SHOW_SKILLS_PER_ROLE,
}: AppleSauce): JSX.Element {
    function showRolePointsForm(role: string) {
        return () =>
            setUiState({
                addingPointsFor: [...uiState.addingPointsFor, role],
            });
    }

    function addDriverPoints(e) {
        e.preventDefault();
        const amount = Number(new FormData(e.target).get("amount") as String);
        player.scoreTimes(role, amount);
        setUiState({
            addingPointsFor: uiState.addingPointsFor.filter(
                (it: any) => it !== role
            ),
        });
        updateGame();
    }

    return (
        <div className="role">
            <hr />

            <label className="role-label">
                {role}
                <ProgressBar percentage={player.percentageFor(role)} />
                <input
                    disabled={true}
                    style={{ display: "none" }}
                    className="role-points"
                    value={player.pointsFor(role)}
                />
            </label>
            <button
                onClick={showRolePointsForm(role)}
                className="rpgui-button add-points-button"
                aria-label={"Add " + role + " Points"}
            >
                <p>Earn</p>
            </button>
            {uiState.addingPointsFor.includes(role) && (
                <form className="add-points-form" onSubmit={addDriverPoints}>
                    <label>
                        Add Points
                        <input
                            className="add-points-input"
                            type="text"
                            name="amount"
                            defaultValue="0"
                        />
                    </label>
                    <button className="rpgui-button" type="submit">
                        <p>Add</p>
                    </button>
                </form>
            )}
            {/* TODO: Add list of activities for this role */}

            {featureFlagShowSkillsPerRole &&
                "junk that should be skills instead"}

            {/*
                 some_function({role}) returns string (or list of strings) to display here....
                 <p>Text goes here</p>
              */}
        </div>
    );
}
