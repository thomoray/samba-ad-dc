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

export default function CreateSite() {
    const [siteName, setSiteName] = useState();
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
    const handleSiteNameChange = (e) => {
        setSiteName(e);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool site create ${siteName}`;
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
            <h3 className="sites-heading">Create a new Site</h3>
            <Form isHorizontal onSubmit={handleSubmit}>
                <FormGroup
                        label="Site Name"
                        isRequired
                        fieldId="horizontal-form-site-name"
                >
                    <TextInput
                            value={siteName}
                            type="text"
                            id="horizontal-form-site-name"
                            aria-describedby="horizontal-form-site-name-helper"
                            name="horizontal-form-site-name"
                            onChange={handleSiteNameChange}
                            placeholder="Site1"
                    />
                </FormGroup>
                <ActionGroup>
                    <Button variant="primary" type="submit">Create Site</Button>
                </ActionGroup>
            </Form>
            <Card isHoverable>
                <CardHeader>Create Site Response</CardHeader>
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
