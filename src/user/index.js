import React from 'react';
import ReactDOM from 'react-dom';
import { Card, CardBody } from '@patternfly/react-core';
import Create from './create';
import List from './list';

function User() {
    return (
        <>
            <Card>
                <CardBody>
                    <Create />
                </CardBody>
            </Card>
            <List />
        </>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<User />, document.getElementById("user"));
});
