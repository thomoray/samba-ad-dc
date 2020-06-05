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
import './index.css';

export default function ShowContact() {
    const [contactName, setContactName] = useState();
    const [contactInfo, setContactInfo] = useState();
    const [error, setError] = useState();
    const [alertVisible, setAlertVisible] = useState();
    const [loading, setLoading] = useState();

    const hideAlert = () => {
        setAlertVisible(false);
    };

    const handleContactNameChange = (e) => {
        setContactName(e);
    };

    const showContact = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool contact show ${contactName}`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    setContactInfo(data);
                    setLoading(false);
                })
                .catch((exception) => {
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
            <h3 className="heading-text">Display a Contact</h3>
            <Form isHorizontal onSubmit={showContact}>
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
                            placeholder="James T. Kirk"
                    />
                </FormGroup>
                <ActionGroup>
                    <Button variant="primary" type="submit">Get Contact Info</Button>
                </ActionGroup>
            </Form>
            <Card isHoverable>
                <CardHeader>Show Contact Response</CardHeader>
                <CardBody>
                    <Loading loading={loading} />
                    <div>{contactInfo}</div>
                </CardBody>
                <CardFooter>
                    <RenderError hideAlert={hideAlert} error={error} alertVisible={alertVisible} />
                </CardFooter>
            </Card>
        </>
    );
}
