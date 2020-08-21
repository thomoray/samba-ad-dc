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

export default function BackupRestore() {
    const [tarFile, setTarFile] = useState('');
    const [outputDir, setOutputDir] = useState('');
    const [serverName, setServerName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();

    const handleOutputDirChange = (e) => setOutputDir(e);
    const handleServerNameChange = (e) => setServerName(e);
    const handleTarFileChange = (e) => setTarFile(e);
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleSubmit = (e) => {
        setLoading(true);
        const command = `samba-tool domain backup restore --backup-file=${tarFile} --targetdir=${outputDir} --newservername=${serverName}`;
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
                Backup Restore
            </Button>
            <Modal
                title="Backup Restore"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="Restore the domain's DB from a backup-file."
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Restore
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
                        label="Backup File"
                        isRequired
                        fieldId="horizontal-form-tar-file"
                    >
                        <TextInput
                            value={tarFile}
                            type="text"
                            id="horizontal-form-tar-file"
                            aria-describedby="horizontal-form-tar-file-helper"
                            name="horizontal-form-tar-file"
                            onChange={handleTarFileChange}
                            placeholder="file.tar.gz"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Target Directory"
                        isRequired
                        fieldId="horizontal-form-target-dir"
                    >
                        <TextInput
                            value={outputDir}
                            type="text"
                            id="horizontal-form-target-dir"
                            aria-describedby="horizontal-form-target-dir-helper"
                            name="horizontal-form-target-dir"
                            onChange={handleOutputDirChange}
                            placeholder="/path/target/dir"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Server Name"
                        isRequired
                        fieldId="horizontal-form-server-name"
                    >
                        <TextInput
                            value={serverName}
                            type="text"
                            id="horizontal-form-server-name"
                            aria-describedby="horizontal-form-server-name-helper"
                            name="horizontal-form-server-name"
                            onChange={handleServerNameChange}
                            placeholder="newServer"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
