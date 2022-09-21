import React from "react";

export function About({onClose}) {
    return <div className="help-overlay rpgui-container framed-golden-2">
        <h1>Mob Programming RPG</h1>
        <p>
            The goal of this game is to teach Mob Programming.<br/>
            It's focus is on remote usage, but you may as well use it onsite.<br/>
            Just share the link to your game with the other players.<br/>
            Find the source code on <a href="https://github.com/gregorriegler/mob-programming-rpg">github</a>
        </p>

        <p>
            The <a href="https://github.com/willemlarsen/mobprogrammingrpg">original Idea and roles</a> have been
            developed by Willem Larsen.<br/>
            Some of it is taken as is, but some is changed...<br/>
        </p>

        <p>
            Credits for the retro rpg styling go to RonenNess for creating the <a
            href="https://github.com/RonenNess/RPGUI">RPGUI</a><br/>
            Thank you, Chris Hamons for the <a href="https://opengameart.org/content/dungeon-crawl-32x32-tiles">dungeon
            crawler icons</a><br/>
            And also CraftPix for the <a href="https://opengameart.org/content/48-pirate-stuff-icons">pirate stuff
            icons</a><br/>
            And for the beautiful <a href="https://www.flaticon.com/free-icon/pirate-ship_1907877">Pirate Ship</a><br/>
        </p>

        <button className="rpgui-button golden close-button" onClick={onClose}>
            <p>Close</p>
        </button>
    </div>;
}