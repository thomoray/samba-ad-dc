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
    Button
} from '@patternfly/react-core';
import cockpit from 'cockpit';

export default function DeleteZone() {
    const [server, setServer] = useState("");
    const [zone, setZone] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [password, setPassword] = useState("");

    const handlePasswordChange = (value) => setPassword(value);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleServerChange = (value) => setServer(value);
    const handleZoneChange = (value) => setZone(value);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool dns zonedelete ${server} ${zone} --password=${password}`;
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

    return (
        <>
            {errorAlertVisible && <ErrorToast errorMessage={errorMessage} closeModal={() => setErrorAlertVisible(false)} />}
            {successAlertVisible && <SuccessToast successMessage={successMessage} closeModal={() => setSuccessAlertVisible(false)} />}
            <Button variant="danger" onClick={handleModalToggle}>
                Delete Zone
            </Button>
            <Modal
                title="Delete a zone"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for deleting a zone"
                actions={[
                    <Button key="confirm" variant="danger" onClick={handleSubmit}>
                        Delete
                    </Button>,
                    <Button key="cancel" variant="link" onClick={handleModalToggle}>
                        Cancel
                    </Button>,
                    <Loading key="loading" loading={loading} />
                ]}
                isFooterLeftAligned
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
                        label="Zone"
                        isRequired
                        fieldId="horizontal-form-zone"
                    >
                        <TextInput
                            value={zone}
                            type="text"
                            id="horizontal-form-zone"
                            aria-describedby="horizontal-form-zone-helper"
                            name="horizontal-form-zone"
                            onChange={handleZoneChange}
                            placeholder="zone1"
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
