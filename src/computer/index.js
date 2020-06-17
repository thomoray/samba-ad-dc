import React from 'react';
import ReactDOM from 'react-dom';
import List from './list';
import Show from './show';
import Create from './create';
import Delete from './delete';
import './css/computer.css';
import { Button } from '@patternfly/react-core';
import { AngleLeftIcon } from '@patternfly/react-icons';

export default function Computer() {
    return (
        <div>
            <div className="back-button">
                <Button onClick={() => history.back()}>
                    <AngleLeftIcon />
                    Back
                </Button>
            </div>
            <h1 className="heading-1">Computer Management</h1>
            <div className="components">
                <List />
            </div>
            <div className="components">
                <Show />
            </div>
            <div className="components">
                <Create />
            </div>
            <div className="components">
                <Delete />
            </div>
        </div>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<Computer />, document.getElementById("computer"));
});
