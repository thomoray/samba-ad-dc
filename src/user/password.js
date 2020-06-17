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

export default function Password() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handlePasswordInputChange = (value) => setPassword(value);

    const handleNewPasswordInputChange = (value) => setNewPassword(value);

    const handleSubmit = () => {
        setLoading(true);
        const command = `samba-tool user password --password=${password} --newpassword=${newPassword}`;
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
                Change Password
            </Button>
            <Modal
                title="Change User's Password"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for changing password for a user account (the one provided in authentication)."
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Change Password
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
                        label="Password"
                        fieldId="horizontal-form-password"
                        isRequired
                    >
                        <TextInput
                            value={password}
                            type="password"
                            id="horizontal-form-password"
                            aria-describedby="horizontal-form-password-helper"
                            name="horizontal-form-password"
                            onChange={handlePasswordInputChange}
                            placeholder="PassW0rd!"
                        />
                    </FormGroup>
                    <FormGroup
                        label="New Password"
                        fieldId="horizontal-form-newPassword"
                        isRequired
                    >
                        <TextInput
                            value={newPassword}
                            type="password"
                            id="horizontal-form-newPassword"
                            aria-describedby="horizontal-form-newPassword-helper"
                            name="horizontal-form-newPassword"
                            onChange={handleNewPasswordInputChange}
                            placeholder="passM0rd!"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
