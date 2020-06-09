import React, { useState, useEffect } from 'react';
import cockpit from 'cockpit';
import {
    Card,
    CardBody,
} from '@patternfly/react-core';
import { Loading, RenderError } from '../common';

export default function List() {
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [alertVisible, setAlertVisible] = useState(false);

    const hideAlert = () => {
        setAlertVisible(false);
    };

    useEffect(() => {
        setLoading(true);
        const command = `samba-tool user list`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    console.log('Success!!');
                    setUsers(data);
                    setLoading(false);
                })
                .catch((exception) => {
                    console.log('Exception reached');
                    setError(exception.message);
                    setLoading(false);
                });
        script();
    }, []);
    return (
        <>
            <Card>
                <CardBody>
                    <Loading loading={loading} />
                    <RenderError error={error} hideAlert={hideAlert} isAlertVisible={alertVisible} />
                    {users}
                </CardBody>
            </Card>
        </>
    );
}