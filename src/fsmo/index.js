import "../lib/patternfly-4-cockpit.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import ShowRoles from './show';
import Seize from './seize';
import Transfer from './transfer';
import { Toolbar, ToolbarItem, ToolbarGroup, ToolbarContent } from '@patternfly/react-core';
import { BackButton } from '../common';
import "../lib/patternfly-4-overrides.scss";

export default function FsmoManagement() {
    return (
        <div>
            <BackButton />
            <Toolbar>
                <ToolbarContent>
                    <ToolbarGroup>
                        <ToolbarItem>
                            <Seize />
                        </ToolbarItem>
                        <ToolbarItem>
                            <Transfer />
                        </ToolbarItem>
                    </ToolbarGroup>
                </ToolbarContent>
            </Toolbar>
            <ShowRoles />
        </div>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<FsmoManagement />, document.getElementById("fsmo"));
});
