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

export default function DeleteGPO() {
    const [gpo, setGpo] = useState("");
    const [container, setContainer] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState();

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);
    const handleGpoChange = (e) => setGpo(e);
    const handleContainerChange = (e) => setContainer(e);

    const handleSubmit = (e) => {
        setLoading(true);
        const command = `samba-tool gpo dellink ${container} ${gpo}`;
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
    return (
        <>
            {errorAlertVisible && <ErrorToast errorMessage={errorMessage} closeModal={() => setErrorAlertVisible(false)} />}
            {successAlertVisible && <SuccessToast successMessage={successMessage} closeModal={() => setSuccessAlertVisible(false)} />}
            <Button variant="danger" onClick={handleModalToggle}>
                Delete Link
            </Button>
            <Modal
                title="Delete GPO link from a container."
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                actions={[
                    <Button key="confirm" variant="danger" onClick={handleSubmit}>
                        Delete
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
                        label="Container"
                        isRequired
                        fieldId="horizontal-form-container"
                    >
                        <TextInput
                            value={container}
                            type="text"
                            id="horizontal-form-container"
                            aria-describedby="horizontal-form-container-helper"
                            name="horizontal-form-container"
                            onChange={handleContainerChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="GPO"
                        isRequired
                        fieldId="horizontal-form-gpo"
                    >
                        <TextInput
                            value={gpo}
                            type="text"
                            id="horizontal-form-gpo"
                            aria-describedby="horizontal-form-gpo-helper"
                            name="horizontal-form-gpo"
                            onChange={handleGpoChange}
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
