import React from 'react';
import ReactDOM from 'react-dom';
import Create from './create';
import Remove from './remove';
import './index.css';
import { AngleLeftIcon } from '@patternfly/react-icons';
import { Button } from '@patternfly/react-core';

export default function Sites() {
    return (
        <div>
            <div className="back-button">
                <Button onClick={() => history.back()}>
                    <AngleLeftIcon />
                    Back
                </Button>
            </div>
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
