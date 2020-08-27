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

export default function Move() {
    const [computerName, setComputerName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newOrgUnit, setNewOrgUnit] = useState("");
    const handleComputerNameChange = (e) => setComputerName(e);
    const handleNewOrgUnitChange = (e) => setNewOrgUnit(e);
    const handleSubmit = () => {
        setLoading(true);
        const command = `samba-tool computer move ${computerName} ${newOrgUnit}`;
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
                Move Computer
            </Button>
            <Modal
                title="Move a computer to an organizational unit/container."
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Move
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
                    <FormGroup
                        label="New OU/Container"
                        isRequired
                        fieldId="horizontal-form-org-Unit"
                    >
                        <TextInput
                            value={newOrgUnit}
                            type="text"
                            id="horizontal-form-org-Unit"
                            aria-describedby="horizontal-form-org-Unit-helper"
                            name="horizontal-form-org-Unit"
                            onChange={handleNewOrgUnitChange}
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
