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
    const [pointsScored, setPointsScored] = useState(false);

    function onSubmitCheckboxes(e) {
        e.preventDefault();
        const checkboxes = e.target.querySelectorAll(`input[type="checkbox"][id^="${role}-"]:checked`);
        const amount = checkboxes.length;
        if(amount > 0) {
            scorePoints(role, amount);
            setPointsScored(true);
            checkboxes.forEach(checkbox => checkbox.checked = false);
        }
    }

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
            <form onSubmit={onSubmitCheckboxes}>
                {role === position && roles[role]?.todos?.map((todo, index) => (
                      <TodoItem
                          key={`${role}-${index}`}
                          todo={todo}
                          role={role}
                          index={index}
                      />
                  ))}
  
                  {role === position && !pointsScored && (
                      <button
                          type="submit"
                          className="rpgui-button"
                          aria-label="Earn Points">
                          <p>Earn</p>
                      </button>
                  )}
            </form>
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

type TodoItemProps = {
    todo: string;
    role: string;
    index: number;
};

function TodoItem({ todo, role, index }: TodoItemProps) {
    const checkboxId = `${role}-${index}`;
    
    return (
        <div className="todo-item">
            <input
                type="checkbox"
                id={checkboxId}
                className="earn-points-checkbox"
            />
            <label htmlFor={checkboxId} className="todo-label">
                {todo}
            </label>
        </div>
    );
}

