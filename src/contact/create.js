import React, { useState } from 'react';
import cockpit from 'cockpit';
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
import { Loading, RenderError, Success } from '../common';
import './index.css';

export default function CreateContact() {
    const [givenName, setGivenName] = useState("");
    const [initials, setInitials] = useState("");
    const [surname, setSurname] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorMessageVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [successAlertVisible, setSuccessMessageVisible] = useState();

    const handleGivenNameChange = (e) => {
        setGivenName(e);
    };

    const handleInitialsChange = (e) => {
        setInitials(e);
    };

    const handleSurnameChange = (e) => {
        setSurname(e);
    };

    const hideSuccessAlert = () => {
        setSuccessMessageVisible(false);
    };

    const hideErrorAlert = () => {
        setErrorMessageVisible(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool contact create --given-name=${givenName} --initials=${initials} --surname=${surname}`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    setSuccessMessage(data);
                    setSuccessMessageVisible(true);
                    setLoading(false);
                })
                .catch((exception) => {
                    setErrorMessage(exception.message);
                    setErrorMessageVisible(true);
                    setLoading(false);
                });
        script();
    };

    return (
        <>
            <h3 className="heading-text">Create New Contact</h3>
            <Form isHorizontal onSubmit={handleSubmit}>
                <FormGroup
                        label="Given Name"
                        isRequired
                        fieldId="horizontal-form-given-name"
                >
                    <TextInput
                            value={givenName}
                            type="text"
                            id="horizontal-form-given-name"
                            aria-describedby="horizontal-form-given-name-helper"
                            name="horizontal-form-given-name"
                            onChange={handleGivenNameChange}
                            placeholder="James"
                    />
                </FormGroup>
                <FormGroup
                        label="Initials"
                        isRequired
                        fieldId="horizontal-form-initials"
                >
                    <TextInput
                            value={initials}
                            type="text"
                            id="horizontal-form-initials"
                            aria-describedby="horizontal-form-initials-helper"
                            name="horizontal-form-initials"
                            onChange={handleInitialsChange}
                            placeholder="T"
                    />
                </FormGroup>
                <FormGroup
                        label="Surname"
                        isRequired
                        fieldId="horizontal-form-surname"
                >
                    <TextInput
                            value={surname}
                            type="text"
                            id="horizontal-form-surname"
                            aria-describedby="horizontal-form-surname-helper"
                            name="horizontal-form-surname"
                            onChange={handleSurnameChange}
                            placeholder="Kirk"
                    />
                </FormGroup>
                <ActionGroup>
                    <Button variant="primary" type="submit">Create Contact</Button>
                </ActionGroup>
            </Form>
            <Card isHoverable>
                <CardHeader>Create Contact Response</CardHeader>
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
