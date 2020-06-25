import React from 'react';
import ReactDOM from 'react-dom';
import Create from './create';
import Cleanup from './cleanup';
import Delete from './delete';
import ServerInfo from './serverinfo';
import ZoneCreate from './zonecreate';
import ZoneDelete from './zonedelete';
import ZoneInfo from './zoneinfo';
import ZoneList from './zonelist';
import { Toolbar, ToolbarItem, ToolbarGroup, ToolbarContent } from '@patternfly/react-core';
import { BackButton } from '../common';

export default function DNSManagement() {
    return (
        <>
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
                            <Cleanup />
                        </ToolbarItem>
                        <ToolbarItem>
                            <ServerInfo />
                        </ToolbarItem>
                    </ToolbarGroup>
                </ToolbarContent>
                <ToolbarContent>
                    <ToolbarGroup>
                        <ToolbarItem>
                            <ZoneCreate />
                        </ToolbarItem>
                        <ToolbarItem>
                            <ZoneDelete />
                        </ToolbarItem>
                        <ToolbarItem>
                            <ZoneList />
                        </ToolbarItem>
                        <ToolbarItem>
                            <ZoneInfo />
                        </ToolbarItem>
                    </ToolbarGroup>
                </ToolbarContent>
            </Toolbar>
        </>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<DNSManagement />, document.getElementById("dns"));
});
