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
    ErrorToast
} from '../common';

export default function DomainInfo() {
    const [ipAddress, setIpAddress] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();

    const handleIpAddressChange = (e) => setIpAddress(e);
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleSubmit = (e) => {
        setLoading(true);
        const command = `samba-tool domain info ${ipAddress}`;
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
            {successAlertVisible &&
            <Modal
                title="Domain Info"
                isOpen={successAlertVisible}
                onClose={() => setSuccessAlertVisible(false)}
                appendTo={document.body}
            >
                <div>{successMessage.map((line) => <h6 key={line.toString()}>{line}</h6>)}</div>
            </Modal>}
            <Button variant="secondary" onClick={handleModalToggle}>
                Domain Info
            </Button>
            <Modal
                title="Domain Info"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="Basic info about a domain and the DC passed as parameter."
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Show
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
                        fieldId="horizontal-form-ip-address"
                    >
                        <TextInput
                            value={ipAddress}
                            type="text"
                            id="horizontal-form-ip-address"
                            aria-describedby="horizontal-form-ip-address-helper"
                            name="horizontal-form-ip-address"
                            onChange={handleIpAddressChange}
                            placeholder="127.0.0.1"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
