import React, { useState, useEffect } from 'react';
import cockpit from 'cockpit';
import { Loading, RenderError } from '../common';
import {
    Card,
    CardBody,
    CardHeader
} from '@patternfly/react-core';

export default function ShowRoles() {
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const hideAlert = () => setAlertVisible(false);

    useEffect(() => {
        setLoading(true);
        const command = `samba-tool fsmo show`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    const splitData = data.split('\n');
                    setRoles(splitData);
                    setLoading(false);
                })
                .catch((exception) => {
                    setError(exception.message);
                    setAlertVisible(true);
                    setLoading(false);
                });
        script();
    }, []);

    return (
        <>
            <Card>
                <CardHeader>Roles</CardHeader>
                <CardBody>
                    <Loading loading={loading} />
                    <RenderError hideAlert={hideAlert} error={error} alertVisible={alertVisible} />
                    {roles.map(role => <li key={role.toString()}>{role}</li>)}
                </CardBody>
            </Card>
        </>
    );
}
