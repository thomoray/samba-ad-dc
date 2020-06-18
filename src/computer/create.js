import React, { useState } from 'react';
import { Loading } from '../common';
import {
    Form,
    FormGroup,
    TextInput,
    Modal,
    Button,
    Alert,
    AlertGroup,
    AlertActionCloseButton,
    AlertVariant,
} from '@patternfly/react-core';
import cockpit from 'cockpit';
import './css/computer.css';

export default function Create() {
    const [computerName, setComputerName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleComputerNameChange = (e) => {
        setComputerName(e);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool computer create ${computerName}`;
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
            {errorAlertVisible &&
            <AlertGroup isToast>
                <Alert
                    isLiveRegion
                    variant={AlertVariant.danger}
                    title="An Error Occurred"
                    actionClose={
                        <AlertActionCloseButton
                            title="Close Error Alert Toast"
                            variantLabel="Danger Alert"
                            onClose={() => setErrorAlertVisible(false)}
                        />
                    }
                >
                    <p>{errorMessage}</p>
                </Alert>
            </AlertGroup>}
            {successAlertVisible &&
            <AlertGroup isToast>
                <Alert
                isLiveRegion
                variant={AlertVariant.success}
                title="Success"
                actionClose={
                    <AlertActionCloseButton
                        title="Close Success Alert Toast"
                        variantLabel="Success Alert"
                        onClose={() => setSuccessAlertVisible(false)}
                    />
                }
                >
                    <p>{successMessage}</p>
                </Alert>
            </AlertGroup>}
            <Button variant="primary" onClick={handleModalToggle}>
                Create Computer
            </Button>
            <Modal
                title="Create A New Computer"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for creating new computers"
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Create
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
                        label="Computer Name"
                        isRequired
                        fieldId="horizontal-form-computer-name"
                    >
                        <TextInput
                            value={computerName}
                            type="text"
                            id="horizontal-form-computer-name"
                            aria-describedby="horizontal-form-computer-name-helper"
                            name="horizontal-form-computer-name"
                            onChange={handleComputerNameChange}
                            placeholder="Computer1"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
