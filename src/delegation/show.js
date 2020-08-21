import React, { useState } from 'react';
import {
    Loading,
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

export default function Show() {
    const [accountName, setaccountName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAccountNameChange = (e) => setaccountName(e);
    const handleSubmit = (e) => {
        setLoading(true);
        const command = `samba-tool delegation show ${accountName}`;
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
            {successAlertVisible &&
            <Modal
                title="Delegation settings"
                isOpen={successAlertVisible}
                onClose={() => setSuccessAlertVisible(false)}
                appendTo={document.body}
            >
                <div>{successMessage.map((line) => <h6 key={line.toString()}>{line}</h6>)}</div>
            </Modal>}
            <Button variant="primary" onClick={handleModalToggle}>
                Show
            </Button>
            <Modal
                title="Show delegation settings"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="Show the delegation setting of an account."
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
                        label="Account Name"
                        isRequired
                        fieldId="horizontal-form-account-name"
                    >
                        <TextInput
                            value={accountName}
                            type="text"
                            id="horizontal-form-account-name"
                            aria-describedby="horizontal-form-account-name-helper"
                            name="horizontal-form-account-name"
                            onChange={handleAccountNameChange}
                            placeholder="account1"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
