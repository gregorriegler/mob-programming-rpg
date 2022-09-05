import { Role } from "./Player";

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
            "Create a failing test. Make it pass. Refactor."
        ]
    },
    Mobber: {
        name: "Mobber",
        todos: [
            "Yield to the less privileged voice",
            "Contribute an idea",
            "Ask questions till you understand",
            "Listen on the edge of your seat"
        ]
    },
    "Rear Admiral": {
        name: "Rear Admiral",
        todos: [
            "Quietly speak into the navigators ear",
            "Give the smallest cue necessary to move the Navigator forward through the problem",
            "Navigate the navigator at the highest level of abstraction they can successfully implement"
        ]
    },
    "Traffic Cop": {
        name: "Traffic Cop",
        todos: [
            "Suggest a relevant new process or working agreement",
            "Point out when the team violates a process or working agreement",
            "Suggest a way to help the team remember to follow a process or working agreement",
            "Point out when a process or working agreement is no longer needed"
        ]
    },
    Archivist: {
        name: "Archivist",
        todos: [
            "Record solution alternatives on a big visible chart or whiteboard so they’re not forgotten",
            "Express an idea as it is taking shape on a big visible chart or whiteboard",
            "Articulate the current task at hand and make it visible to the entire mob",
            "Capture design decisions and other technical details for the team*"
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
            "Point out an unnamed variable or method",
            "Propose an action for deodorizing the code"
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
            "Pick the mobber with the least privilege and support their contributions",
            "Celebrate moments of excellence"
        ]
    }
};