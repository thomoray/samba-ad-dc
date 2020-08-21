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
    SuccessToast,
    ErrorToast
} from '../../common';

export default function CreateTrust() {
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
        const command = `samba-tool domain trust create ${domain}`;
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
            <Button variant="primary" onClick={handleModalToggle}>
                Create Trust
            </Button>
            <Modal
                title="Create trust"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="Create a domain or forest trust."
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Create
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
                            placeholder="DOMAIN"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
