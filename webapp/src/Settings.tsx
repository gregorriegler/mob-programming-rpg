import React from "react";

export function Settings({game, updateGameState, onClose}) {

    const submitSettings = (event): void => {
        const formData = new FormData(event.target);
        const players = formData.get("change-players") as string;
        const timer = formData.get("change-timer") as string;
        game.setPlayers(players);
        game.changeTimer(parseInt(timer) * 60);
        updateGameState();
        event.preventDefault();
    };

    return <div className="rpgui-container framed-golden settings">
        <form onSubmit={submitSettings}>
            <label>Change Players
                <textarea id="change-players" name="change-players"
                          defaultValue={game.playerNames()}></textarea>
            </label>
            <label>Change Timer (in minutes)
                <input id="change-timer" name="change-timer"
                       defaultValue={game.timerInMinutes()}></input>
            </label>
            <button className="rpgui-button"><p>X</p></button>
            <button type="submit" className="rpgui-button"><p>Save</p></button>
            <button className="rpgui-button" onClick={onClose}><p>Close</p></button>
        </form>
    </div>;
}