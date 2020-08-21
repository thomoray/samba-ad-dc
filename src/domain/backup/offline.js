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
} from '../../common';

export default function BackupOffline() {
    const [targetDir, setTargetDir] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();

    const handleTargetDirChange = (e) => setTargetDir(e);
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleSubmit = (e) => {
        setLoading(true);
        const command = `samba-tool domain backup offline --targetdir=${targetDir}`;
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
                Backup Offline
            </Button>
            <Modal
                title="Backup Offline"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="Backup the local domain directories safely into a tar file."
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Backup
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
                        label="Target Directory"
                        isRequired
                        fieldId="horizontal-form-target-dir"
                    >
                        <TextInput
                            value={targetDir}
                            type="text"
                            id="horizontal-form-target-dir"
                            aria-describedby="horizontal-form-target-dir-helper"
                            name="horizontal-form-target-dir"
                            onChange={handleTargetDirChange}
                            placeholder="127.0.0.1"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
