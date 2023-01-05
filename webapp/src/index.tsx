import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MobProgrammingRPG from "./MobProgrammingRPG";
import { gameIdFromUrl } from "./infrastructure/GameIdFromUrl";
import { Game } from './model/Game';

const root = ReactDOM.createRoot(document.getElementById('root')!!);
root.render(
    <React.StrictMode>
        <MobProgrammingRPG
            initGame={new Game({ timer: parseInt(process.env.REACT_APP_ROTATE_AFTER!!), id: gameIdFromUrl() })}
            wsServer={process.env.REACT_APP_WS_URL!!}
            wsReconnect={true}
        />
    </React.StrictMode>
);

