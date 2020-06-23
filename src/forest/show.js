import React, { useState, useEffect } from 'react';
import cockpit from 'cockpit';
import { Loading, RenderError } from '../common';
import {
    Card,
    CardBody,
    CardHeader,
} from '@patternfly/react-core';

export default function Show() {
    const [list, setList] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    const hideAlert = () => {
        setAlertVisible(false);
    };

    useEffect(() => {
        setLoading(true);
        cockpit.script(`samba-tool forest directory_service show`, { superuser: true, err: 'message' })
                .done((data) => {
                    const splitData = data.split('\n');
                    const sortedData = splitData.sort();
                    setList(sortedData);
                    setLoading(false);
                })
                .catch((exception) => {
                    setError(exception.message);
                    setAlertVisible(true);
                    setLoading(false);
                });
    }, []);
    return (
        <Card>
            <CardHeader>Directory Service settings for the forest.</CardHeader>
            <CardBody>
                <Loading loading={loading} />
                <RenderError hideAlert={hideAlert} error={error} alertVisible={alertVisible} />
                {list}
            </CardBody>
        </Card>
    );
}
