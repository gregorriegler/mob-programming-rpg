import React from "react";
import { Role } from "./model/Roles";

export function Badge({ role }: any) {
  function badgeSource(role: Role) {
    const images = {
      Typing: "driver-badge.png",
      Talking: "navigator-badge.png",
      Observing: "observing-badge.png",
      Researcher: "researcher-badge.png",
      Sponsor: "sponsor-badge.png",
      "Rear Admiral": "rear-admiral-badge.png",
      Automationist: "automationist-badge.png",
      Nose: "nose-badge.png",
      Archivist: "archivist-badge.png",
      "Traffic Cop": "traffic-cop-badge.png",
      Disciplinarian: "disciplinarian-badge.png",
    };
    return `${process.env.PUBLIC_URL}/img/icons/${images[role]}`;
  }

  return (
    <div className="rpgui-icon magic-slot">
      {role !== undefined && (
        <img
          src={badgeSource(role)}
          alt={role + " Badge"}
          aria-label={role + " Badge"} />
      )}
    </div>
  );
}
