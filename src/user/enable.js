import React, { useState } from 'react';
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
import { Loading } from '../common';

export default function Enable() {
    const [userName, setUserName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleUsernameInputChange = (value) => setUserName(value);

    const handleSubmit = () => {
        setLoading(true);
        const command = `samba-tool user enable ${userName}`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    console.log(data);
                    setSuccessMessage(data);
                    setSuccessAlertVisible(true);
                    setLoading(false);
                    setIsModalOpen(false);
                })
                .catch((exception) => {
                    console.log(exception);
                    setErrorMessage(exception.message);
                    setErrorAlertVisible(true);
                    setLoading(false);
                    setIsModalOpen(false);
                });
        script();
    };
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
                Enable User
            </Button>
            <Modal
                title="Enable A User"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for enabling user for use in the domain on the local server"
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Enable
                    </Button>,
                    <Button key="cancel" variant="link" onClick={handleModalToggle}>
                        Cancel
                    </Button>,
                    <Loading key="loading" loading={loading} />
                ]}
                isFooterLeftAligned
                appendTo={document.body}
            >
                <Form isHorizontal onSubmit={handleSubmit}>
                    <FormGroup
                        label="Username"
                        fieldId="horizontal-form-username"
                    >
                        <TextInput
                            value={userName}
                            type="text"
                            id="horizontal-form-username"
                            aria-describedby="horizontal-form-username-helper"
                            name="horizontal-form-username"
                            onChange={handleUsernameInputChange}
                            placeholder="User1"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
