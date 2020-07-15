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

export default function BackupOnline() {
    const [targetDir, setTargetDir] = useState('');
    const [server, setServer] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();

    const handleTargetDirChange = (e) => setTargetDir(e);
    const handleServerChange = (e) => setServer(e);
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool backup online --server=${server} --targetdir=${targetDir}`;
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
                Backup Online
            </Button>
            <Modal
                title="Backup Online"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="Copy a running DC's current DB into a backup tar file."
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Backup
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
                        label="Target Directory"
                        isRequired
                        fieldId="horizontal-form-ip-address"
                    >
                        <TextInput
                            value={targetDir}
                            type="text"
                            id="horizontal-form-ip-address"
                            aria-describedby="horizontal-form-ip-address-helper"
                            name="horizontal-form-ip-address"
                            onChange={handleTargetDirChange}
                            placeholder="/path"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
