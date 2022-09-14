import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MobProgrammingRPG from "./MobProgrammingRPG";
import { gameIdFromUrl } from "./infrastructure/GameIdFromUrl";

const root = ReactDOM.createRoot(document.getElementById('root')!!);
root.render(
    <React.StrictMode>
        <MobProgrammingRPG 
            rotateAfter={parseInt(process.env.REACT_APP_ROTATE_AFTER!!)} 
            wsServer={process.env.REACT_APP_WS_URL!!}
            wsReconnect={true}
            gameId={gameIdFromUrl()}
        />
    </React.StrictMode>
);

