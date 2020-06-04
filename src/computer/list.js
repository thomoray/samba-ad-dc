import React, { useState, useEffect } from 'react';
import cockpit from 'cockpit';
import { Loading, RenderError } from '../common';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader
} from '@patternfly/react-core';
import './css/computer.css';

function ComputerList() {
    const [list, setList] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [alertVisible, setAlertVisible] = useState(false);

    const hideAlert = () => {
        setAlertVisible(false);
    };

    useEffect(() => {
        const command = `samba-tool computer list`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    setList(data);
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
            <div>
                <h3 className="list-computer-heading">Computers in AD DC</h3>
                <Card>
                    <CardHeader>Computer List</CardHeader>
                    <CardBody>
                        <Loading loading={loading} />
                        <p>{list}</p>
                    </CardBody>
                    <CardFooter>
                        <RenderError hideAlert={hideAlert} error={error} alertVisible={alertVisible} />
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

export default ComputerList;
