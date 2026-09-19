import React from "react";
import { Role, roles } from "./model/Roles";
import { Player } from "./model/Player";
import { ProgressBar } from "./ProgressBar";

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
    function onSubmitCheckboxes(e) {
        e.preventDefault();
        const checkboxes = e.target.querySelectorAll(`input[type="checkbox"]:checked`);
        const amount = checkboxes.length;
        if(amount > 0) {
            scorePoints(role, amount);
            checkboxes.forEach(checkbox => checkbox.checked = false);
        }
    }

    const canEarnPoints = role === position || position === "Observing" && role !== "Talking" && role != "Typing";
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
        
        <form onSubmit={onSubmitCheckboxes}>
            {canEarnPoints && (
                    <>
                        {roles[role]?.todos?.map((todo, index) => (
                            <TodoItem
                                key={`${role}-${index}`}
                                todo={todo}
                            />
                        ))}

                        <button
                            type="submit"
                            className="rpgui-button"
                            aria-label="Earn Points">
                            <p>Earn</p>
                        </button>
                    </>
                )}
        </form>
    
        {/*
                 some_function({role}) returns string (or list of strings) to display here....
                 <p>Text goes here</p>
              */}
    </div>;
}

type TodoItemProps = {
    todo: string;
};

function TodoItem({ todo }: TodoItemProps) {
    return (
        <label className="todo-item">
            <input
                type="checkbox"
                className="earn-points-checkbox"
            />
            <span className="todo-label">
                {todo}
            </span>
        </label>
    );
}

