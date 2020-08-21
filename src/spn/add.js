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

export default function Create() {
    const [name, setName] = useState("");
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNameChange = (e) => setName(e);
    const handleUserChange = (e) => setUser(e);
    const handleSubmit = (e) => {
        setLoading(true);
        const command = `samba-tool spn add ${name} ${user}`;
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
                Add SPN
            </Button>
            <Modal
                title="Create A New SPN"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
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
                    <FormGroup
                        label="User"
                        isRequired
                        fieldId="horizontal-form-user"
                    >
                        <TextInput
                            value={user}
                            type="text"
                            id="horizontal-form-user"
                            aria-describedby="horizontal-form-user-helper"
                            name="horizontal-form-user"
                            onChange={handleUserChange}
                            placeholder="User1"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
