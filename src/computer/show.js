import React, { useState } from 'react';
import cockpit from 'cockpit';
import {
    Form,
    FormGroup,
    TextInput,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    ActionGroup
} from '@patternfly/react-core';
import {
    RenderError,
    Loading,
} from '../common';
import './css/computer.css';

export default function Show() {
    const [computerName, setComputerName] = useState();
    const [computerAdObject, setComputerAdObject] = useState();
    const [error, setError] = useState();
    const [alertVisible, setAlertVisible] = useState();
    const [loading, setLoading] = useState();

    const hideAlert = () => {
        setAlertVisible(false);
    };

    const objectList = () => computerAdObject.map((obj) => <div key={obj.toString()}>{obj}</div>);

    const handleComputerNameChange = (e) => {
        setComputerName(e);
    };

    const showObject = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool computer show ${computerName}`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    const splitRes = data.split('\n');
                    setComputerAdObject(splitRes);
                    setLoading(false);
                })
                .catch((exception) => {
                    console.log(exception);
                    if (exception != null) {
                        setError(exception.message);
                        setAlertVisible(true);
                        setLoading(false);
                    }
                });
        return script();
    };
    return (
        <>
            <h3 className="show-computer-heading">Display a Computer AD Object</h3>
            <Form isHorizontal onSubmit={showObject}>
                <FormGroup
                        label="Computer Name"
                        isRequired
                        fieldId="horizontal-form-computer-name"
                >
                    <TextInput
                            value={computerName}
                            type="text"
                            id="horizontal-form-computer-name"
                            aria-describedby="horizontal-form-computer-name-helper"
                            name="horizontal-form-computer-name"
                            onChange={handleComputerNameChange}
                            placeholder="dc1"
                    />
                </FormGroup>
                <ActionGroup>
                    <Button variant="primary" type="submit">Get AD Object</Button>
                </ActionGroup>
            </Form>
            <Card isHoverable>
                <CardHeader>Computer's AD Object Response</CardHeader>
                <CardBody>
                    <Loading loading={loading} />
                    {objectList}
                </CardBody>
                <CardFooter>
                    <RenderError hideAlert={hideAlert} error={error} alertVisible={alertVisible} />
                </CardFooter>
            </Card>
        </>
    );
}
