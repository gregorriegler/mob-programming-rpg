export type Role = "Driver"
    | "Navigator"
    | "Mobber"
    | "Archivist"
    | "Automationist"
    | "Nose"
    | "Disciplinarian"
    | "Rear Admiral"
    | "Researcher"
    | "Sponsor"
    | "Traffic Cop";

export const DRIVER_THEN_NAVIGATOR: string = "Driver,Navigator"
export const NAVIGATOR_THEN_DRIVER: string = "Navigator,Driver"

export const levels: Role[][] = [
    [
        "Driver",
        "Navigator",
        "Mobber",
    ],
    [
        "Researcher",
        "Sponsor",
        "Archivist",
        "Traffic Cop"
    ],
    [
        "Disciplinarian",
        "Nose",
        "Rear Admiral",
    ],
    [
        "Automationist",
    ],
    []
];

export function levelOf(role: Role) {
    for (let level = 0; level < levels.length; level++) {
        if (levels[level].includes(role)) {
            return level;
        }
    }
}

export interface RoleDetails {
    name: Role,
    todos: string[]
}

type AllRoleDetails = {
    [key in Role]: RoleDetails;
};
export const roles: AllRoleDetails = {
    Driver: {
        name: "Driver",
        todos: [
            "Ask a clarifying question about what to type",
            "Type something you disagree with",
            "Use a new keyboard shortcut",
            "Learn something new about tooling",
            "Ignore a direct instruction from someone who isn't the Navigator"
        ]
    },
    Navigator: {
        name: "Navigator",
        todos: [
            "Ask for ideas",
            "Filter the mob's ideas then tell the Driver exactly what to type",
            "Tell the Driver only your high-level intent and have them implement the details",
            "Create a failing test", 
            "Make it pass as simple as possible",
            "Do a refactoring while staying in the green"
        ]
    },
    Mobber: {
        name: "Mobber",
        todos: [
            "Contribute an idea",
            "Admit a thing you didn't understand",
            "Ask questions till you understand",
            "Listen on the edge of your seat"
        ]
    },
    "Rear Admiral": {
        name: "Rear Admiral",
        todos: [
            "Quietly speak into the Navigators ear",
            "Give the smallest cue necessary to move the Navigator forward through the problem",
            "Navigate the Navigator at the highest level of abstraction they can successfully implement"
        ]
    },
    "Traffic Cop": {
        name: "Traffic Cop",
        todos: [
            "Make sure the team has a shared goal and follows it",
            "Point out when the direction is inappropriately changed after a rotation",
            "Suggest a relevant new process or working agreement",
            "Point out when the team violates a process or working agreement",
            "Suggest a way to help the team remember to follow a process or working agreement",
            "Point out when a process or working agreement is no longer needed"
        ]
    },
    Archivist: {
        name: "Archivist",
        todos: [
            "Help a person understand and use a drawing/sketch if feasible",
            "Make sure everybody is on the same page by sketching comprehensible examples ",
            "Remind the team to write down the thing they want to do later",
            "Capture/discuss advantages/disadvantages of a design decision for the team",
            "Record solution alternatives visibly for the team so they’re not forgotten",
            "Express an idea as it is taking shape on a big visible chart or whiteboard",
            "Articulate the current task at hand and make it visible to the entire mob",
        ]
    },
    Automationist: {
        name: "Automationist",
        todos: [
            "Point out a repeated task in a tool",
            "Point out a repeated aspect of team process",
            "Point out possible boiler plate code",
            "Propose an automation for a repeated task "
        ]
    },
    Nose: {
        name: "Nose",
        todos: [
            "Point out a long line of code",
            "Point out a complex conditional",
            "Point out duplication",
            "Point out a poorly named variable or method",
            "Propose an action for deodorizing the code"
        ]
    },
    Disciplinarian: {
        name: "Disciplinarian",
        todos: [
            "Remind the team to check if the tests pass.",
            "Remind the navigator to write a failing test first.",
            "Make sure we do not refactor while the tests are failing.",
            "Remind the group to refactor when in the green.",
        ]
    },
    Researcher: {
        name: "Researcher",
        todos: [
            "Find and share relevant information from documentation",
            "Find and share relevant information from a blog",
            "Find and share relevant information from a coding forum"
        ]
    },
    Sponsor: {
        name: "Sponsor",
        todos: [
            "Amplify the unheard voice",
            "Make sure the current Navigator is not overruled and gets their fair chance.",
            "Celebrate moments of excellence",
            "Cheer up the mob in times of struggle"
        ]
    }
};
