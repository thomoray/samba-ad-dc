import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Toolbar, ToolbarItem, ToolbarGroup, ToolbarContent } from '@patternfly/react-core';
import Create from './create';
import List from './list';
import { AngleLeftIcon } from '@patternfly/react-icons';
import './index.css';
import Enable from './enable';
import Disable from './disable';
import Delete from './delete';
import Move from './move';
import Show from './show';
import Password from './password';
import SetExpiry from './setexpiry';
import SetPassword from './setpassword';

function User() {
    return (
        <>
            <div className="back-button">
                <Button onClick={() => history.back()}>
                    <AngleLeftIcon />
                    Back
                </Button>
            </div>
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
                            <Enable />
                        </ToolbarItem>
                        <ToolbarItem>
                            <Disable />
                        </ToolbarItem>
                        <ToolbarItem>
                            <Move />
                        </ToolbarItem>
                        <ToolbarItem>
                            <Show />
                        </ToolbarItem>
                    </ToolbarGroup>
                </ToolbarContent>
                <ToolbarContent>
                    <ToolbarItem>
                        <Password />
                    </ToolbarItem>
                    <ToolbarItem>
                        <SetExpiry />
                    </ToolbarItem>
                    <ToolbarItem>
                        <SetPassword />
                    </ToolbarItem>
                </ToolbarContent>
            </Toolbar>
            <List />
        </>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<User />, document.getElementById("user"));
});
