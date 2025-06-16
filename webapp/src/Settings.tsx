import React, { useState } from "react";
import { GAMEPLAY_ORDER_TYPER_THEN_NAVIGATOR, Game, GAMEPLAY_ORDER_NAVIGATOR_THEN_TYPER } from "./model/Game";

export function Settings({ game, updateGameState, onClose }: { game: Game, updateGameState: () => void, onClose: () => void }) {

    const submitSettings = (event): void => {
        const formData = new FormData(event.target);
        const players = formData.get("change-players") as string;
        const timer = formData.get("change-timer") as string;
        game.setPlayers(players);
        game.changeTimer(parseInt(timer) * 60);
        if (roles === GAMEPLAY_ORDER_TYPER_THEN_NAVIGATOR) {
            game.navigatorThenTyping();
        } else {
            game.typingThenNavigator();
        }
        updateGameState();
        event.preventDefault();
    };

    const [roles, setRoles] = useState(GAMEPLAY_ORDER_NAVIGATOR_THEN_TYPER);

    function onClickRoles() {
        if (roles === GAMEPLAY_ORDER_NAVIGATOR_THEN_TYPER) {
            setRoles(GAMEPLAY_ORDER_TYPER_THEN_NAVIGATOR)
        } else {
            setRoles(GAMEPLAY_ORDER_NAVIGATOR_THEN_TYPER)
        }
    }

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
            <button type="button" className="rpgui-button" onClick={onClickRoles}><p>{roles}</p></button>
            <button type="submit" className="rpgui-button"><p>Save</p></button>
            <button className="rpgui-button" onClick={onClose}><p>Close</p></button>
        </form>
    </div>;
}