import "../lib/patternfly-4-cockpit.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import Get from './get';
import Set from './set';
import ChangeDomsId from './changedomsid';
import GetDosInfo from './getdosinfo';
import SysvolCheck from './sysvolcheck';
import SysvolReset from './sysvolreset';
import { Toolbar, ToolbarItem, ToolbarGroup, ToolbarContent } from '@patternfly/react-core';
import { BackButton } from '../common';
import "../lib/patternfly-4-overrides.scss";

export default function NTAcl() {
    return (
        <>
            <BackButton />
            <Toolbar>
                <ToolbarContent>
                    <ToolbarGroup>
                        <ToolbarItem>
                            <Get />
                        </ToolbarItem>
                        <ToolbarItem>
                            <Set />
                        </ToolbarItem>
                        <ToolbarItem>
                            <ChangeDomsId />
                        </ToolbarItem>
                        <ToolbarItem>
                            <GetDosInfo />
                        </ToolbarItem>
                        <ToolbarItem>
                            <SysvolCheck />
                        </ToolbarItem>
                        <ToolbarItem>
                            <SysvolReset />
                        </ToolbarItem>
                    </ToolbarGroup>
                </ToolbarContent>
            </Toolbar>
        </>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<NTAcl />, document.getElementById("ntacl"));
});
