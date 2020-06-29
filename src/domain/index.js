import "../lib/patternfly-4-cockpit.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import Info from './info';
import './index.css';
import { BackButton } from '../common';
import "../lib/patternfly-4-overrides.scss";

export default function Domain() {
    return (
        <>
            <BackButton />
            <Info />
        </>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<Domain />, document.getElementById("domain"));
});
