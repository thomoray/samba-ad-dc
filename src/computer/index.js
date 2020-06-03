import React from 'react';
import ReactDOM from 'react-dom';
import List from './list';
import cockpit from 'cockpit';
import './css/computer.css';

export default function Computer() {
    return (
        <div>
            <h1 className="heading-1">Main Computer Management Component</h1>
            <List />
        </div>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<Computer />, document.getElementById("computer"));
});
