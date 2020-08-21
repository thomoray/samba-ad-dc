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

export default function CreateGroup() {
    const [groupName, setGroupName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlegroupNameChange = (e) => {
        setGroupName(e);
    };
    const handleSubmit = (e) => {
        setLoading(true);
        const command = `samba-tool group create ${groupName}`;
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
                Create group
            </Button>
            <Modal
                title="Create A New group"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for creating new groups"
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
                        label="Group Name"
                        isRequired
                        fieldId="horizontal-form-group-name"
                    >
                        <TextInput
                            value={groupName}
                            type="text"
                            id="horizontal-form-group-name"
                            aria-describedby="horizontal-form-group-name-helper"
                            name="horizontal-form-group-name"
                            onChange={handlegroupNameChange}
                            placeholder="group1"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
