import React, { useState } from 'react';
import {
    Loading,
    SuccessToast,
    ErrorToast
} from '../common';
import {
    Form,
    FormGroup,
    TextInput,
    Modal,
    Button,
} from '@patternfly/react-core';
import cockpit from 'cockpit';

export default function CreatDNS() {
    const [name, setName] = useState("");
    const [server, setServer] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [password, setPassword] = useState("");

    const handlePasswordChange = (value) => setPassword(value);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNameChange = (e) => setName(e);
    const handleSubmit = (e) => {
        setLoading(true);
        const command = `samba-tool dns cleanup ${server} ${name} --password=${password}`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    setSuccessMessage(data);
                    setSuccessAlertVisible(true);
                    setLoading(false);
                    setIsModalOpen(false);
                })
                .catch((exception) => {
                    setErrorMessage(exception.message);
                    setErrorAlertVisible(true);
                    setLoading(false);
                    setIsModalOpen(false);
                });
        script();
    };
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);
    const handleServerChange = (value) => setServer(value);

    return (
        <>
            {errorAlertVisible && <ErrorToast errorMessage={errorMessage} closeModal={() => setErrorAlertVisible(false)} />}
            {successAlertVisible && <SuccessToast successMessage={successMessage} closeModal={() => setSuccessAlertVisible(false)} />}
            <Button variant="secondary" onClick={handleModalToggle}>
                Cleanup
            </Button>
            <Modal
                title="Cleanup DNS Records"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for cleaning up DNS records for a DNS host"
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Cleanup
                    </Button>,
                    <Button key="cancel" variant="link" onClick={handleModalToggle}>
                        Cancel
                    </Button>,
                    <Loading key="loading" loading={loading} />
                ]}
                appendTo={document.body}
            >
                <Form isHorizontal>
                    <FormGroup
                        label="Server"
                        isRequired
                        fieldId="horizontal-form-server"
                    >
                        <TextInput
                            value={server}
                            type="text"
                            id="horizontal-form-server"
                            aria-describedby="horizontal-form-server-helper"
                            name="horizontal-form-server"
                            onChange={handleServerChange}
                            placeholder="dc1"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Name"
                        isRequired
                        fieldId="horizontal-form-name"
                    >
                        <TextInput
                            value={name}
                            type="text"
                            id="horizontal-form-name"
                            aria-describedby="horizontal-form-name-helper"
                            name="horizontal-form-name"
                            onChange={handleNameChange}
                            placeholder="dc1.samdom.test.site"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Password"
                        isRequired
                        fieldId="horizontal-form-password"
                    >
                        <TextInput
                            value={password}
                            type="password"
                            id="horizontal-form-password"
                            aria-describedby="horizontal-form-password-helper"
                            name="horizontal-form-password"
                            onChange={handlePasswordChange}
                            placeholder="password"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
