import React, { useState } from "react";
import { Role } from "./model/Roles";
import { Player } from "./model/Player";
import { ProgressBar } from "./ProgressBar";
import { EarnPointsForRoleForm } from "./EarnPointsForRoleForm";

type RoleSheetProps = {
    player: Player;
    role: Role;
    featureFlagShowSkillsPerRole?: boolean;
    scorePoints: any;
};

export function RoleSheet({
    player,
    role,
    featureFlagShowSkillsPerRole = !!process.env
        .REACT_APP_FEATURE_FLAG_SHOW_SKILLS_PER_ROLE,
    scorePoints
}: RoleSheetProps): JSX.Element {
    return <div className="role">
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
            <EarnPointsForRole role={role} scorePoints={scorePoints} />
            {/* TODO: Add list of activities for this role */}
            {featureFlagShowSkillsPerRole &&
                "junk that should be skills instead"}
            {/*
                 some_function({role}) returns string (or list of strings) to display here....
                 <p>Text goes here</p>
              */}
        </div>;
}

type EarnPointsForRoleProps = {
    role: string;
    scorePoints: any;
};


function EarnPointsForRole({ role, scorePoints }: EarnPointsForRoleProps) {
    const [formVisible, setFormVisible] = useState(false);

    function onSubmit(e) {
        e.preventDefault();
        const amount = Number(new FormData(e.target).get("amount") as String);
        scorePoints(role, amount);
        setFormVisible(false);
    }

    return <>
        <button
            onClick={() => setFormVisible(true)}
            className="rpgui-button add-points-button"
            aria-label={"Earn " + role + " Points"}>
            <p>Earn</p>
        </button>
        {formVisible && <EarnPointsForRoleForm onSubmit={onSubmit} />}
    </>
}

