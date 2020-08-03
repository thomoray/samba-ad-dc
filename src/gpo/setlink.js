import React, { useState } from 'react';
import cockpit from 'cockpit';
import {
    Form,
    FormGroup,
    TextInput,
    Modal,
    Button
} from '@patternfly/react-core';
import {
    Loading,
    ErrorToast,
    SuccessToast
} from '../common';

export default function SetLink() {
    const [container, setcontainer] = useState('');
    const [gpo, setGpo] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();

    const handlecontainerChange = (e) => setcontainer(e);
    const handleGpoChange = (e) => setGpo(e);
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleSubmit = (e) => {
        setLoading(true);
        const command = `samba-tool gpo setlink ${container} ${gpo}`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    const splitData = data.split('\n');
                    setSuccessMessage(splitData);
                    setSuccessAlertVisible(true);
                    setLoading(false);
                    setIsModalOpen(false);
                })
                .catch((exception) => {
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
                Get Links
            </Button>
            <Modal
                title="Add or update a GPO link to a container."
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Set Link
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
                        label="container"
                        isRequired
                        fieldId="horizontal-form-container"
                    >
                        <TextInput
                            value={container}
                            type="text"
                            id="horizontal-form-container"
                            aria-describedby="horizontal-form-container-helper"
                            name="horizontal-form-container"
                            onChange={handlecontainerChange}
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
