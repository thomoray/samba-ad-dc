import React from 'react';
import ReactDOM from 'react-dom';
import Info from './info';

export default function TestComputer() {
    return (
        <>
            <Info />
        </>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<TestComputer />, document.getElementById("domain"));
});
