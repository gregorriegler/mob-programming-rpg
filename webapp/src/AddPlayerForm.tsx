import { AvatarSelect } from "./AvatarSelect";
import React from "react";

export function AddPlayerForm({game, updateGameState, close}) {
    function submitAddPlayerForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const playerName = formData.get("name") as string;
        if (playerName.trim() === "") return;
        const avatar = formData.get("avatar") as string;
        game.addPlayer(playerName, avatar);
        updateGameState();
        close();
    }

    return <div className="add-player-form rpgui-container framed-golden-2">
        <form onSubmit={submitAddPlayerForm}>
            <h2>Add new Player</h2>
            <input placeholder={"Player Name"} name="name"/>
            <AvatarSelect/>
            <button type="submit" className="rpgui-button golden"><p>Add</p></button>
            <button className="rpgui-button golden" onClick={close}><p>Cancel</p></button>
        </form>
    </div>;
}