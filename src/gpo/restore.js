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

export default function CreateGPO() {
    const [displayName, setDisplayName] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDisplayNameChange = (e) => setDisplayName(e);
    const handleLocationChange = (e) => setLocation(e);
    const handleSubmit = (e) => {
        setLoading(true);
        const command = `samba-tool gpo restore ${displayName} ${location}`;
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
            <Button variant="secondary" onClick={handleModalToggle}>
                Restore GPO
            </Button>
            <Modal
                title="Restore a GPO to a new container."
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Restore
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
                        label="Display Name"
                        isRequired
                        fieldId="horizontal-form-display-name"
                    >
                        <TextInput
                            value={displayName}
                            type="text"
                            id="horizontal-form-display-name"
                            aria-describedby="horizontal-form-display-name-helper"
                            name="horizontal-form-display-name"
                            onChange={handleDisplayNameChange}
                            placeholder="gpo1"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Backup location"
                        isRequired
                        fieldId="horizontal-form-location"
                    >
                        <TextInput
                            value={location}
                            type="text"
                            id="horizontal-form-location"
                            aria-describedby="horizontal-form-location-helper"
                            name="horizontal-form-location"
                            onChange={handleLocationChange}
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
