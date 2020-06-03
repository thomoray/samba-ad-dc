import React from 'react';
import ReactDOM from 'react-dom';
import Info from './info';

export default function Domain() {
    return (
        <>
            <Info />
        </>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<Domain />, document.getElementById("domain"));
});
