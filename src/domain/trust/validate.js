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
} from '../../common';

export default function ValidateTrust() {
    const [domain, setDomain] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();

    const handleDomainChange = (e) => setDomain(e);
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleSubmit = (e) => {
        setLoading(true);
        const command = `samba-tool domain trust validate ${domain}`;
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
            {successAlertVisible &&
            <Modal
                title="Validate Trust"
                isOpen={successAlertVisible}
                onClose={() => setSuccessAlertVisible(false)}
                appendTo={document.body}
            >
                <div>{successMessage.map((line) => <h6 key={line.toString()}>{line}</h6>)}</div>
            </Modal>}
            <Button variant="secondary" onClick={handleModalToggle}>
                Validate Trust
            </Button>
            <Modal
                title="Validate Trust"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="Validate a domain trust."
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Validate
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
                        label="Domain"
                        isRequired
                        fieldId="horizontal-form-domain"
                    >
                        <TextInput
                            value={domain}
                            type="text"
                            id="horizontal-form-domain"
                            aria-describedby="horizontal-form-domain-helper"
                            name="horizontal-form-domain"
                            onChange={handleDomainChange}
                            placeholder="127.0.0.1"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
