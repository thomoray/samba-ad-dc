import React, { useState } from 'react';
import { Loading, RenderError, Success } from '../common';
import {
    Form,
    FormGroup,
    TextInput,
    ActionGroup,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardFooter
} from '@patternfly/react-core';
import cockpit from 'cockpit';
import './css/computer.css';

export default function Delete() {
    const [computerName, setComputerName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const hideSuccessAlert = () => {
        setSuccessAlertVisible(false);
    };
    const hideErrorAlert = () => {
        setErrorAlertVisible(false);
    };
    const handleComputerNameChange = (e) => {
        setComputerName(e);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool computer delete ${computerName}`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    console.log(data);
                    setSuccessMessage(data);
                    setSuccessAlertVisible(true);
                    setLoading(false);
                })
                .catch((exception) => {
                    console.log(exception);
                    setErrorMessage(exception.message);
                    setErrorAlertVisible(true);
                    setLoading(false);
                });
        script();
    };
    return (
        <>
            <h3 className="delete-computer-heading">Delete a Computer</h3>
            <Form isHorizontal onSubmit={handleSubmit}>
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
                            placeholder="Computer1"
                    />
                </FormGroup>
                <ActionGroup>
                    <Button variant="primary" type="submit">Delete Computer</Button>
                </ActionGroup>
            </Form>
            <Card isHoverable>
                <CardHeader>Delete Computer Response</CardHeader>
                <CardBody>
                    <Loading loading={loading} />
                    <Success
                    message={successMessage}
                    hideAlert={hideSuccessAlert}
                    alertVisible={successAlertVisible}
                    />
                </CardBody>
                <CardFooter>
                    <RenderError
                    hideAlert={hideErrorAlert}
                    error={errorMessage}
                    alertVisible={errorAlertVisible}
                    />
                </CardFooter>
            </Card>
        </>
    );
}
