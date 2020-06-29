import "../lib/patternfly-4-cockpit.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import List from './list';
import Show from './show';
import Create from './create';
import Delete from './delete';
import { Toolbar, ToolbarItem, ToolbarGroup, ToolbarContent } from '@patternfly/react-core';
import { BackButton } from '../common';
import './css/computer.css';
import "../lib/patternfly-4-overrides.scss";

export default function Computer() {
    return (
        <div>
            <BackButton />
            <Toolbar>
                <ToolbarContent>
                    <ToolbarGroup>
                        <ToolbarItem>
                            <Create />
                        </ToolbarItem>
                        <ToolbarItem>
                            <Delete />
                        </ToolbarItem>
                        <ToolbarItem>
                            <Show />
                        </ToolbarItem>
                    </ToolbarGroup>
                </ToolbarContent>
            </Toolbar>
            <List />
        </div>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<Computer />, document.getElementById("computer"));
});
