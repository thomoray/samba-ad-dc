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
    FormSelect,
    FormSelectOption
} from '@patternfly/react-core';
import cockpit from 'cockpit';

export default function AnyProtocol() {
    const [accountName, setAccountName] = useState("");
    const [protocolState, setProtocolState] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const protocolStateOptions = [
        { value: 'off', label: 'off', disabled: false },
        { value: 'on', label: 'on', disabled: false },
    ];

    const handleProtocolStateChange = (e) => setProtocolState(e);
    const handleAccountNameChange = (e) => setAccountName(e);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool delegation for-any-protocol ${accountName} ${protocolState}`;
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
                Any Protocol
            </Button>
            <Modal
                title="For Any Protocol"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="Set/unset UF_TRUSTED_TO_AUTHENTICATE_FOR_DELEGATION (S4U2Proxy) for an account."
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Set
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
                    <FormGroup label="Role" isRequired fieldId="horizontal-form-role">
                        <FormSelect
                            value={protocolState}
                            onChange={handleProtocolStateChange}
                            id="horzontal-form-role"
                            name="horizontal-form-role"
                            aria-label="Role"
                        >
                            {protocolStateOptions.map((option, index) => (
                                <FormSelectOption key={index} value={option.value} label={option.label} />
                            ))}
                        </FormSelect>
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
