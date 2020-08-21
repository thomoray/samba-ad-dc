import React, { useState } from 'react';
import cockpit from 'cockpit';
import {
    Form,
    FormGroup,
    TextInput,
    Modal,
    Button,
    FormSelect,
    FormSelectOption
} from '@patternfly/react-core';
import {
    Loading,
    ErrorToast,
    SuccessToast
} from '../common';

export default function DCPromo() {
    const [dnsDomain, setDnsDomain] = useState('');
    const [role, setRole] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();

    const handleDnsDomainChange = (e) => setDnsDomain(e);
    const handleRoleChange = (e) => setRole(e);

    const serverRole = [
        { value: 'DC', label: 'DC', disabled: false },
        { value: 'RODC', label: 'RODC', disabled: false },
    ];

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleSubmit = (e) => {
        setLoading(true);
        const command = `samba-tool domain dcpromo ${dnsDomain} ${role}`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    const splitData = data.split('\n');
                    setSuccessMessage(splitData);
                    setSuccessAlertVisible(true);
                    setLoading(false);
                    setIsModalOpen(false);
                })
                .catch((exception) => {
                    console.log(exception);
                    if (exception != null) {
                        setErrorMessage(exception.message);
                        setErrorAlertVisible(true);
                        setLoading(false);
                        setIsModalOpen(false);
                    }
                });
        return script();
    };
    return (
        <>
            {errorAlertVisible && <ErrorToast errorMessage={errorMessage} closeModal={() => setErrorAlertVisible(false)} />}
            {successAlertVisible && <SuccessToast successMessage={successMessage} closeModal={() => setSuccessAlertVisible(false)} />}
            <Button variant="secondary" onClick={handleModalToggle}>
                Promote DC
            </Button>
            <Modal
                title="Promote DC"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="Promote an existing domain member or NT4 PDC to an AD DC."
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Promote
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
                        label="DNS Domain"
                        isRequired
                        fieldId="horizontal-form-dns-domain"
                    >
                        <TextInput
                            value={dnsDomain}
                            type="text"
                            id="horizontal-form-dns-domain"
                            aria-describedby="horizontal-form-dns-domain-helper"
                            name="horizontal-form-dns-domain"
                            onChange={handleDnsDomainChange}
                        />
                    </FormGroup>
                    <FormGroup label="Role" isRequired fieldId="horizontal-form-role">
                        <FormSelect
                            value={role}
                            onChange={handleRoleChange}
                            id="horzontal-form-role"
                            name="horizontal-form-role"
                            aria-label="Role"
                        >
                            {serverRole.map((option, index) => (
                                <FormSelectOption key={index} value={option.value} label={option.label} />
                            ))}
                        </FormSelect>
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
