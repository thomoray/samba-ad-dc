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
import './index.css';

export default function DeleteContact() {
    const [contactName, setContactName] = useState();
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
    const handleContactNameChange = (e) => {
        setContactName(e);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool contact delete ${contactName}`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    setSuccessMessage(data);
                    setSuccessAlertVisible(true);
                    setLoading(false);
                })
                .catch((exception) => {
                    setErrorMessage(exception.message);
                    setErrorAlertVisible(true);
                    setLoading(false);
                });
        script();
    };
    return (
        <>
            <h3 className="heading-text">Delete a Contact</h3>
            <Form isHorizontal onSubmit={handleSubmit}>
                <FormGroup
                        label="Contact Name"
                        isRequired
                        fieldId="horizontal-form-contact-name"
                >
                    <TextInput
                            value={contactName}
                            type="text"
                            id="horizontal-form-contact-name"
                            aria-describedby="horizontal-form-contact-name-helper"
                            name="horizontal-form-contact-name"
                            onChange={handleContactNameChange}
                            placeholder="Contact1"
                    />
                </FormGroup>
                <ActionGroup>
                    <Button variant="primary" type="submit">Delete Contact</Button>
                </ActionGroup>
            </Form>
            <Card isHoverable>
                <CardHeader>Delete Contact Response</CardHeader>
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
