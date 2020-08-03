import React, { useState, useEffect } from 'react';
import cockpit from 'cockpit';
import { Loading, RenderError } from '../common';
import {
    Card,
    CardBody,
    CardHeader
} from '@patternfly/react-core';

export default function ListAll() {
    const [gpoList, setGpoList] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    const hideAlert = () => setAlertVisible(false);
    useEffect(() => {
        setLoading(true);
        const command = `samba-tool gpo listall`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    const splitData = data.split('\n');
                    setGpoList(splitData);
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
                <CardHeader>All GPOs</CardHeader>
                <CardBody>
                    <Loading loading={loading} />
                    <RenderError hideAlert={hideAlert} error={error} alertVisible={alertVisible} />
                    {gpoList.map(gpo => <li key={gpo.toString()}>{gpo}</li>)}
                </CardBody>
            </Card>
        </>
    );
}
