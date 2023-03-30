import React, {useEffect, useState} from "react";
import {Role} from "./model/Roles";
import {noOp} from "./model/Func";
import { Player } from "./model/Player";


const PlayerDisplay = ({player, updateGameState = noOp, position = "Mobber"}: { player: Player, updateGameState: () => void, position: string}) => {

    const [uiState, setUiState] = useState({addingPointsFor: []})

    function selectRole(event: any) {
        const role = new FormData(event.target).get("role") as Role;
        player.selectRole(role);
        updateGameState();
        setUiState({addingPointsFor: []});
        event.preventDefault();
    }

    return <li className='player rpgui-container framed-golden' aria-label={player.name}>
        <h2>{position}</h2>
        <h2><img className='avatar' src={`${process.env.PUBLIC_URL}/img/avatars/${player.avatar}.png`}
                 alt={player.avatar}/>{player.name}</h2>

        {player.badges.map(role => <Badge key={role} role={role}/>)}
        {player.badges.length < 4 && Array.from(Array(4 - player.badges.length).keys())
            .map((item, index) => <div key={index} className="rpgui-icon magic-slot"/>)}
        {player.roles.map(role => <RolePoints key={role}
                                                role={role}
                                                player={player}
                                                updateGame={updateGameState}
                                                uiState={uiState}
                                                setUiState={setUiState}/>)}
        {player.selectableRoles().length > 0 &&
            <form onSubmit={selectRole}>
                <label>
                    Available Roles
                    <SelectRole player={player}/>
                </label>
                <button className="rpgui-button" type="submit"><p>Select</p></button>
            </form>
        }
    </li>
}

const Badge = ({role}: any) => {
    function badgeSource(role: Role) {
        const images = {
            "Driver": "driver-badge.png",
            "Navigator": "navigator-badge.png",
            "Mobber": "mobber-badge.png",
            "Researcher": "researcher-badge.png",
            "Sponsor": "sponsor-badge.png",
            "Rear Admiral": "rear-admiral-badge.png",
            "Automationist": "automationist-badge.png",
            "Nose": "nose-badge.png",
            "Archivist": "archivist-badge.png",
            "Traffic Cop": "traffic-cop-badge.png",
            "Disciplinarian": "disciplinarian-badge.png",
        }
        return `${process.env.PUBLIC_URL}/img/icons/${images[role]}`;
    }

    return <div className="rpgui-icon magic-slot">
        {role !== undefined &&
            <img src={badgeSource(role)} alt={role + " Badge"} aria-label={role + " Badge"}/>}
    </div>
}

function RolePoints({player, role, setUiState, uiState, updateGame}: {player: Player, role: Role, setUiState: any, uiState: any, updateGame: any }): JSX.Element {
    function showRolePointsForm(role: string) {
        return () =>
            setUiState({
                addingPointsFor: [...uiState.addingPointsFor, role]
            });
    }

    function addDriverPoints(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const amount = new FormData(e.target).get("amount") as String;
        player.scoreTimes(role, amount);
        setUiState({
            addingPointsFor: uiState.addingPointsFor.filter((it: any) => it !== role)
        });
        updateGame();
    }

    return <div className="role">
        <hr/>
        
        <label className="role-label">
            {role}
            <div className="rpgui-progress" data-rpguitype="progress" data-value={0.1}>
                <div className="rpgui-progress-track">
                    <div className="rpgui-progress-fill" style={{left: '0px', width: ''+player.percentageFor(role)+'%'}}></div>
                </div>
                <div className=" rpgui-progress-left-edge"></div>
                <div className=" rpgui-progress-right-edge"></div>
            </div>
            <input disabled={true} style={{display: 'none'}} className="role-points" value={player.pointsFor(role)}/>
        </label>
        <button
            onClick={showRolePointsForm(role)}
            className="rpgui-button add-points-button"
            aria-label={"Add " + role + " Points"}
        >
            <p>Earn</p>
        </button>
        {uiState.addingPointsFor.includes(role) &&
            <form className="add-points-form" onSubmit={addDriverPoints}>
                <label>
                    Add Points
                    <input className="add-points-input" type="text" name="amount" defaultValue="0"/>
                </label>
                <button className="rpgui-button" type="submit"><p>Add</p></button>
            </form>
        }
    </div>
}

function SelectRole({player}: {player:Player}): JSX.Element {
    useEffect(() => {
        // @ts-ignore
        if (window.RPGUI !== undefined) {
            const selectElement = document.getElementById(player.name + "-role-select");
            if (selectElement!!.getAttribute("data-rpguitype") === "dropdown") return
            // @ts-ignore
            window.RPGUI.create(selectElement, "dropdown")
        }
    }, [player]);

    return <>
        <select name="role" id={player.name + "-role-select"} className="rpgui-dropdown">
            {player.selectableRoles().map((role: boolean | React.Key | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined) =>
                <option key={role} value={role}>{role}</option>)
            }
        </select>
    </>
}

export default PlayerDisplay;