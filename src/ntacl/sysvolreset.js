import React, { useState } from 'react';
import {
    Loading,
    ErrorToast,
    SuccessToast
} from '../common';
import {
    Form,
    FormGroup,
    TextInput,
    Modal,
    Button
} from '@patternfly/react-core';
import cockpit from 'cockpit';

export default function SysvolReset() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [file, setFile] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleFileChange = (e) => setFile(e);
    const handleSubmit = (e) => {
        setLoading(true);
        const cmd = ["samba-tool", "ntacl", "sysvolreset", `${file}`];
        const script = () => cockpit.spawn(cmd, { superuser: true, err: 'message' })
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
            <Button variant="primary" onClick={handleModalToggle}>
                SysvolReset
            </Button>
            <Modal
                title="Reset sysvol ACLs to defaults"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Reset
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
                        label="File"
                        isRequired
                        fieldId="horizontal-form-file"
                    >
                        <TextInput
                            value={file}
                            type="text"
                            id="horizontal-form-file"
                            aria-describedby="horizontal-form-file-helper"
                            name="horizontal-form-file"
                            onChange={handleFileChange}
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
