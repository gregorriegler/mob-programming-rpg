import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MobProgrammingRPG from "./MobProgrammingRPG";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MobProgrammingRPG rotateAfter={4*60}/>
);

