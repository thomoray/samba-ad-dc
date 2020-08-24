import React, { useState } from 'react';
import {
    Loading,
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

export default function GetDosInfo() {
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
        const cmd = ["samba-tool", "ntacl", "getdosinfo", `${file}`];
        const script = () => cockpit.spawn(cmd, { superuser: true, err: 'message' })
                .done((data) => {
                    const splitData = data.split('\n');
                    setSuccessMessage(splitData);
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
            {successAlertVisible &&
            <Modal
                title="Get DOS info of a file from xattr."
                isOpen={successAlertVisible}
                onClose={() => setSuccessAlertVisible(false)}
                appendTo={document.body}
            >
                <div>{successMessage.map((line) => <h6 key={line.toString()}>{line}</h6>)}</div>
            </Modal>}
            <Button variant="primary" onClick={handleModalToggle}>
                Get Dos Info
            </Button>
            <Modal
                title="Get DOS info of a file from xattr."
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Get Info
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
