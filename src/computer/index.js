import React from 'react';
import ReactDOM from 'react-dom';

export default function Computer() {
    return (
        <div>
            <h1>Main Computer Management Component</h1>
        </div>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<Computer />, document.getElementById("computer"));
});
