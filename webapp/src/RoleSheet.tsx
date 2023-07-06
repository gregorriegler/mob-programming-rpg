import React, { useState } from "react";
import { Role } from "./model/Roles";
import { Player } from "./model/Player";
import { ProgressBar } from "./ProgressBar";
import { EarnPointsForRoleButton } from "./EarnPointsForRoleButton";
import { EarnPointsForRoleForm } from "./EarnPointsForRoleForm";

type RoleSheetProps = {
    player: Player;
    role: Role;
    setUiState: any;
    updateGame: any;
    featureFlagShowSkillsPerRole?: boolean;
};

export function RoleSheet({
    player,
    role,
    setUiState,
    updateGame,
    featureFlagShowSkillsPerRole = !!process.env
        .REACT_APP_FEATURE_FLAG_SHOW_SKILLS_PER_ROLE,
}: RoleSheetProps): JSX.Element {

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
            <EarnPointsForRole
                role={role}
                player={player}
                updateGame={updateGame}
                changeStateOnParent={() => setUiState(Math.random())} />
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

type EarnPointsForRoleProps = {
    role: string;
    player: Player;
    updateGame: any;
    changeStateOnParent: () => void;
};

// {EarnPointsForRole(showEarnPointsForRoleForm, role, uiState, earnPoints)}
function EarnPointsForRole({ role, player, updateGame, changeStateOnParent }: EarnPointsForRoleProps) {
    const [state, setState] = useState(false);
    // todo: does uiState belong in the parent component (role sheet)?
    // could separate the uiState conceerns:
    // 1 concern is the list of roles (driver, rear admiral, etc) at the level of the player display, is high level
    // 2 adding points could be in the new EarnPoints component

    function onSubmit(e) {
        e.preventDefault();
        const amount = Number(new FormData(e.target).get("amount") as String);
        player.scoreTimes(role, amount);
        setState(false);
        updateGame();
        changeStateOnParent();
    }

    if (state === true) {
        return <>
            <EarnPointsForRoleButton onClick={() => () => setState(true)} role={role} />
            <EarnPointsForRoleForm onSubmit={onSubmit} />
        </>;
    } else {
        return <EarnPointsForRoleButton onClick={() => () => setState(true)} role={role} />;
    }

    // return <><EarnPointsForRoleButton onClick={() => {setState(true)}} role={role} />
    //     {state && (
    //         <EarnPointsForRoleForm onSubmit={earnPoints2} />
    //     )}</>;

    // todo: bundle all earn points related code into a single component
    //return <><EarnPointsForRoleButton onClick={() => {setState(true)}} role={role} />
    //    {state && (
    //        <EarnPointsForRoleForm onSubmit={earnPoints2} />
    //    )}</>;
}

