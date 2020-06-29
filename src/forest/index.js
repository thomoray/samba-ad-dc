import "../lib/patternfly-4-cockpit.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import DSHeuristics from './dsheuristics';
import Show from './show';
import { Toolbar, ToolbarItem, ToolbarGroup, ToolbarContent } from '@patternfly/react-core';
import { BackButton } from '../common';
import "../lib/patternfly-4-overrides.scss";

export default function Forest() {
    return (
        <>
            <BackButton />
            <Toolbar>
                <ToolbarContent>
                    <ToolbarGroup>
                        <ToolbarItem>
                            <DSHeuristics />
                        </ToolbarItem>
                    </ToolbarGroup>
                </ToolbarContent>
            </Toolbar>
            <Show />
        </>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<Forest />, document.getElementById("forest"));
});
