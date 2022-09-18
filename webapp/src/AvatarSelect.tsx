import { avatars } from "./model/Player";
import React, { useState } from "react";

export const AvatarSelect = () => {
    const [selected, setSelected] = useState(avatars[0]);

    return <div className="avatar-select">
        <p>Choose an Avatar</p>
        <input type="hidden" id="avatar-input" value={selected} name="avatar"/>
        {avatars.map((avatar) =>
            <div id={`avatar-option-${avatar}`}
                 className={avatar === selected ? "avatar-option selected" : "avatar-option"} key={avatar}
                 onClick={() => setSelected(avatar)}>
                <img src={`${process.env.PUBLIC_URL}/img/avatars/${avatar}.png`} alt={avatar}/>
            </div>
        )}
    </div>;
};