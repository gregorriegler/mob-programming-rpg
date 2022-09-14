import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MobProgrammingRPG from "./MobProgrammingRPG";
import { gameIdFromUrl } from "./GameIdFromUrl";

const root = ReactDOM.createRoot(document.getElementById('root')!!);
root.render(
    <React.StrictMode>
        <MobProgrammingRPG 
            rotateAfter={parseInt(process.env.REACT_APP_ROTATE_AFTER!!)} 
            wsServer={process.env.REACT_APP_WS_URL!!}
            gameId={gameIdFromUrl()}
        />
    </React.StrictMode>
);

