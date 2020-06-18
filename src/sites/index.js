import React from 'react';
import ReactDOM from 'react-dom';
import Create from './create';
import Remove from './remove';
import './index.css';
import { BackButton } from '../common';

export default function Sites() {
    return (
        <div>
            <BackButton />
            <h1 className="sites-heading">Sites Management</h1>
            <div className="components">
                <Create />
            </div>
            <div className="components">
                <Remove />
            </div>
        </div>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<Sites />, document.getElementById("sites"));
});
