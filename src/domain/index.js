import React from 'react';
import ReactDOM from 'react-dom';
import Info from './info';
import { AngleLeftIcon } from '@patternfly/react-icons';
import { Button } from '@patternfly/react-core';
import './index.css';

export default function Domain() {
    return (
        <>
            <div className="back-button">
                <Button onClick={() => history.back()}>
                    <AngleLeftIcon />
                    Back
                </Button>
            </div>
            <Info />
        </>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<Domain />, document.getElementById("domain"));
});
