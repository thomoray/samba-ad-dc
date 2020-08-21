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

export default function ClassicUpgrade() {
    const [dbdir, setDbdir] = useState('');
    const [smbconf, setSmbconf] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();

    const handleDbdirChange = (e) => setDbdir(e);
    const handleSmbconfChange = (e) => setSmbconf(e);
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleSubmit = (e) => {
        setLoading(true);
        const command = `samba-tool domain classicupgrade --dbdir=${dbdir} ${smbconf}`;
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
                Classic Upgrade
            </Button>
            <Modal
                title="Classic Upgrade"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="Upgrade from Samba classic (NT4-like) database to Samba AD DC database."
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Upgrade
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
                        label="Database Directory"
                        isRequired
                        fieldId="horizontal-form-db-dir"
                    >
                        <TextInput
                            value={dbdir}
                            type="text"
                            id="horizontal-form-db-dir"
                            aria-describedby="horizontal-form-db-dir-helper"
                            name="horizontal-form-db-dir"
                            onChange={handleDbdirChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Classic smb conf"
                        isRequired
                        fieldId="horizontal-form-smb-conf"
                    >
                        <TextInput
                            value={smbconf}
                            type="text"
                            id="horizontal-form-smb-conf"
                            aria-describedby="horizontal-form-smb-conf-helper"
                            name="horizontal-form-smb-conf"
                            onChange={handleSmbconfChange}
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
