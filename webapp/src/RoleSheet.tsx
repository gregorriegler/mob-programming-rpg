import React from "react";
import { Role } from "./model/Roles";
import { Player } from "./model/Player";
import { ProgressBar } from "./ProgressBar";
import { EarnPointsForRoleButton } from "./EarnPointsForRoleButton";
import { EarnPointsForRoleForm } from "./EarnPointsForRoleForm";

type RoleSheetProps = {
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
}: RoleSheetProps): JSX.Element {
    function showEarnPointsForRoleForm(role: string) {
        return () =>
            setUiState({
                addingPointsFor: [...uiState.addingPointsFor, role],
            });
    }

    function earnPoints(e) {
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
        (<div className="role">
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
            {EarnPointsForRole(showEarnPointsForRoleForm, role, uiState, earnPoints)}
            {/* TODO: Add list of activities for this role */}
            {featureFlagShowSkillsPerRole &&
                "junk that should be skills instead"}
            {/*
                 some_function({role}) returns string (or list of strings) to display here....
                 <p>Text goes here</p>
              */}
        </div>)
    );
}




function EarnPointsForRole(showEarnPointsForRoleForm: (role: string) => () => any, role: string, uiState: any, earnPoints: (e: any) => void) {
    // todo: does uiState belong in the parent component (role sheet)?
        // could separate the uiState conceerns:
        // 1 concern is the list of roles (driver, rear admiral, etc) at the level of the player display, is high leven
        // 2 adding points could be in the new EarnPoints component

    // todo: bundle all earn points related code into a single component
    return <><EarnPointsForRoleButton onClick={showEarnPointsForRoleForm} role={role} />
        {uiState.addingPointsFor.includes(role) && (
            <EarnPointsForRoleForm onSubmit={earnPoints} />
        )}</>;
}

