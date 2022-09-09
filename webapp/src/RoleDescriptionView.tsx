import React from "react";

const RoleDescriptionView = ({roleDetails}) => {

    return <section className="role-description rpgui-container framed-golden">
        <h4 title={roleDetails.name}>{roleDetails.name}</h4>
        <ul>
            {roleDetails.todos.map((it, index) => <li key={index}>{it}</li>)}
        </ul>
    </section>
}

export default RoleDescriptionView;