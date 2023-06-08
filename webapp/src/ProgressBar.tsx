import React from "react";

export function ProgressBar({ percentage }: { percentage: number }) {
    return (
        <div
            className="rpgui-progress"
            data-rpguitype="progress"
            data-value={0.1}
        >
            <div className="rpgui-progress-track">
                <div
                    className="rpgui-progress-fill"
                    style={{
                        left: "0px",
                        width: "" + percentage + "%",
                    }}
                ></div>
            </div>
            <div className=" rpgui-progress-left-edge"></div>
            <div className=" rpgui-progress-right-edge"></div>
        </div>
    );
}
