import React from 'react';
import ReactDOM from 'react-dom';
import Create from './create';
import List from './list';
import Show from './show';
import Delete from './delete';
import './index.css';
import { AngleLeftIcon } from '@patternfly/react-icons';
import { Button } from '@patternfly/react-core';

export default function Contact() {
    return (
        <div>
            <div className="back-button">
                <Button onClick={() => history.back()}>
                    <AngleLeftIcon />
                    Back
                </Button>
            </div>
            <h1 className="heading-text">Contact Management</h1>
            <div className="components-margin">
                <List />
            </div>
            <div className="components-margin">
                <Create />
            </div>
            <div className="components-margin">
                <Show />
            </div>
            <div className="components-margin">
                <Delete />
            </div>
        </div>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<Contact />, document.getElementById("contact"));
});
