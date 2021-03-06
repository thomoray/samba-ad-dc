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

export default function CreatDNS() {
    const [name, setName] = useState("");
    const [server, setServer] = useState("");
    const [zone, setZone] = useState("");
    const [type, setType] = useState("");
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [password, setPassword] = useState("");

    const handlePasswordChange = (value) => setPassword(value);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const typeOptions = [
        { value: '', label: 'Choose a record', disabled: false },
        { value: 'A', label: 'A', disabled: false },
        { value: 'AAAA', label: 'AAAA', disabled: false },
        { value: 'PTR', label: 'PTR', disabled: false },
        { value: 'CNAME', label: 'CNAME', disabled: false },
        { value: 'NS', label: 'NS', disabled: false },
        { value: 'MX', label: 'MX', disabled: false },
        { value: 'SRV', label: 'SRV', disabled: false },
        { value: 'TXT', label: 'TXT', disabled: false },
    ];

    const handleNameChange = (e) => setName(e);
    const handleSubmit = (e) => {
        setLoading(true);
        const command = `samba-tool dns add ${server} ${zone} ${name} ${type} ${data} --password=${password}`;
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
    const handleZoneChange = (value) => setZone(value);
    const handleDataChange = (value) => setData(value);
    const handleTypeChange = (value) => setType(value);

    return (
        <>
            {errorAlertVisible && <ErrorToast errorMessage={errorMessage} closeModal={() => setErrorAlertVisible(false)} />}
            {successAlertVisible && <SuccessToast successMessage={successMessage} closeModal={() => setSuccessAlertVisible(false)} />}
            <Button variant="primary" onClick={handleModalToggle}>
                Create DNS Record
            </Button>
            <Modal
                title="Create A DNS Record"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for creating DNS Records"
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Create
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
                            placeholder="127.0.0.1"
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
                            placeholder="Name1"
                        />
                    </FormGroup>
                    <FormGroup label="Type" isRequired fieldId="horizontal-form-dns-type">
                        <FormSelect
                            value={type}
                            onChange={handleTypeChange}
                            id="horzontal-form-dns-type"
                            name="horizontal-form-dns-type"
                            aria-label="Type"
                        >
                            {typeOptions.map((option, index) => (
                                <FormSelectOption key={index} value={option.value} label={option.label} />
                            ))}
                        </FormSelect>
                    </FormGroup>
                    <FormGroup
                        label="data"
                        isRequired
                        fieldId="horizontal-form-data"
                    >
                        <TextInput
                            value={data}
                            type="text"
                            id="horizontal-form-data"
                            aria-describedby="horizontal-form-data-helper"
                            name="horizontal-form-data"
                            onChange={handleDataChange}
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
