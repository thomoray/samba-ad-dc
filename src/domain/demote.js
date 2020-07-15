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

export default function Demote() {
    const [server, setServer] = useState('');
    const [ldbUrl, setLdbUrl] = useState('');
    const [deadServer, setDeadServer] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();

    const handleServerChange = (e) => setServer(e);
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);
    const handleLdbUrlChange = (e) => setLdbUrl(e);
    const handleDeadServerChange = (e) => setDeadServer(e);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const cmd = ["samba-tool", "domain", "demote"];
        if (server.length > 0) {
            cmd.push(`--server=${server}`);
        }
        if (ldbUrl.length > 0) {
            cmd.push(`--URL=${ldbUrl}`);
        }
        if (deadServer.length > 0) {
            cmd.push(`----remove-other-dead-server=${deadServer}`);
        }
        const script = () => cockpit.script(cmd, { superuser: true, err: 'message' })
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
            <Button variant="danger" onClick={handleModalToggle}>
                Demote DC
            </Button>
            <Modal
                title="Demote DC"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="Demote ourselves from the role of Domain Controller."
                actions={[
                    <Button key="confirm" variant="danger" onClick={handleSubmit}>
                        Demote
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
                        fieldId="horizontal-form-server"
                        helperText="Writable DC to write demotion changes on"
                    >
                        <TextInput
                            value={server}
                            type="text"
                            id="horizontal-form-server"
                            aria-describedby="horizontal-form-server-helper"
                            name="horizontal-form-server"
                            onChange={handleServerChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="URL"
                        fieldId="horizontal-form-ldb-url"
                        helperText="LDB URL for database or target server"
                    >
                        <TextInput
                            value={ldbUrl}
                            type="text"
                            id="horizontal-form-ldb-url"
                            aria-describedby="horizontal-form-ldb-url-helper"
                            name="horizontal-form-ldb-url"
                            onChange={handleLdbUrlChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Dead Server"
                        fieldId="horizontal-form-dead-server"
                        helperText="Dead DC (name or NTDS GUID) to remove ALL references to (rather than this DC)"
                    >
                        <TextInput
                            value={deadServer}
                            type="text"
                            id="horizontal-form-dead-server"
                            aria-describedby="horizontal-form-dead-server-helper"
                            name="horizontal-form-dead-server"
                            onChange={handleDeadServerChange}
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
