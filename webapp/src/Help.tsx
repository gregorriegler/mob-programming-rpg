import {roles} from "./model/Roles";
import RoleDescriptionView from "./RoleDescriptionView";
import React from "react";

export function Help({game, timeIsOver, onClose}) {
    return <div className="help-overlay rpgui-container framed-golden-2">
        {timeIsOver &&
            <>
                <h2>Time is over</h2>
                <h3 title="Next Typing"><span className="yellow">{game.typer()}</span>, you're the next Typing
                </h3>
                <h3 title="Next Talking"><span className="yellow">{game.navigator()}</span>, you're the next
                    Talking</h3>
            </>
        }
        {!timeIsOver &&
            <>
                <h2>This is how you gain XP:</h2>
            </>
        }
        <div className="flex-box">
            {Object.entries(roles).map(it => <RoleDescriptionView key={it[0]} roleDetails={it[1]}/>)}
        </div>

        <br className="clear-left"/>
        <button className="rpgui-button golden close-button" onClick={onClose}>
            <p>Close</p>
        </button>
    </div>;
}