import React, { useState } from 'react';
import cockpit from 'cockpit';
import {
    Form,
    FormGroup,
    TextInput,
    Button,
    Modal
} from '@patternfly/react-core';
import {
    Loading,
    ErrorToast
} from '../common';

export default function ShowContact() {
    const [contactName, setContactName] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState();

    const handleContactNameChange = (e) => setContactName(e);
    const handleSuccessModalClose = () => setSuccessAlertVisible(false);
    const handleErrorAlertClose = () => setErrorAlertVisible(false);

    const handleSubmit = (e) => {
        setLoading(true);
        const command = `samba-tool contact show ${contactName}`;
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
        return script();
    };
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);
    return (
        <>
            {errorAlertVisible && <ErrorToast errorMessage={errorMessage} closeModal={handleErrorAlertClose} />}
            {successAlertVisible &&
            <Modal
                title="Contact Object"
                isOpen={successAlertVisible}
                onClose={handleSuccessModalClose}
                appendTo={document.body}
            >
                <div>{successMessage.map((line) => <h6 key={line.toString()}>{line}</h6>)}</div>
            </Modal>}
            <Button variant="secondary" onClick={handleModalToggle}>
                Show Contact
            </Button>
            <Modal
                title="Show A Contact"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Show
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
                </Form>
            </Modal>
        </>
    );
}
