import React, { useState } from "react";
import { Role, roles } from "./model/Roles";
import { Player } from "./model/Player";
import { ProgressBar } from "./ProgressBar";
import { EarnPointsForRoleForm } from "./EarnPointsForRoleForm";

type RoleSheetProps = {
    player: Player;
    role: Role;
    position: string;
    scorePoints: any;
};

export function RoleSheet({
    player,
    role,
    position,
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
        <div>
            {role == "Typing" && position == "Typing" && roles[role].todos.map(s => <div key={s}>{s}</div>)}
            {role == "Navigator" && position == "Navigator" && roles[role].todos.map(s => <div key={s}>{s}</div>)}
            {role == "Mobber" && position == "Mobber" && roles[role].todos.map(s => <div key={s}>{s}</div>)}
        </div>
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

