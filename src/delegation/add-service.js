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

export default function AddService() {
    const [accountName, setAccountName] = useState('');
    const [principal, setPrincipal] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAccountNameChange = (e) => setAccountName(e);
    const handlePrincipalChange = (e) => setPrincipal(e);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool delegation add-service ${accountName} ${principal}`;
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
            <Button variant="primary" onClick={handleModalToggle}>
                Add Service
            </Button>
            <Modal
                title="Add Service"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="Add a service principal as msDS-AllowedToDelegateTo."
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Add
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
                    <FormGroup
                        label="Principal"
                        isRequired
                        fieldId="horizontal-form-principal"
                    >
                        <TextInput
                            value={principal}
                            type="text"
                            id="horizontal-form-principal"
                            aria-describedby="horizontal-form-principal-helper"
                            name="horizontal-form-principal"
                            onChange={handlePrincipalChange}
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
