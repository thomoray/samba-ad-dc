import React, { useState } from 'react';
import {
    Loading,
    SuccessToast,
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

export default function SetAccess() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [url, setUrl] = useState('');
    const [car, setCar] = useState('');
    const [action, setAction] = useState('');
    const [objectdn, setObjectdn] = useState('');
    const [trusteedn, setTrusteedn] = useState('');
    const [sddl, setSddl] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleUrlChange = (e) => setUrl(e);
    const handleCarChange = (e) => setCar(e);
    const handleActionChange = (e) => setAction(e);
    const handleObjectdnChange = (e) => setObjectdn(e);
    const handleTrusteednChange = (e) => setTrusteedn(e);
    const handleSddlChange = (e) => setSddl(e);

    const handleSubmit = (e) => {
        setLoading(true);
        const cmd = ["samba-tool", "dsacl", "set"];
        if (url.length > 0) {
            cmd.push(`--URL=${url}`);
        }
        if (car.length > 0) {
            cmd.push(`--car=${car}`);
        }
        if (action.length > 0) {
            cmd.push(`--action=${action}`);
        }
        if (objectdn.length > 0) {
            cmd.push(`--objectdn=${objectdn}`);
        }
        if (trusteedn.length > 0) {
            cmd.push(`--trusteedn=${trusteedn}`);
        }
        if (sddl.length > 0) {
            cmd.push(`--sddl=${sddl}`);
        }
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
                Modify Access List
            </Button>
            <Modal
                title="Modify Access List"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Set
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
                        label="Url"
                        fieldId="horizontal-form-computer-name"
                    >
                        <TextInput
                            value={url}
                            type="text"
                            id="horizontal-form-url"
                            aria-describedby="horizontal-form-url-helper"
                            name="horizontal-form-url"
                            onChange={handleUrlChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Car"
                        fieldId="horizontal-form-car"
                    >
                        <TextInput
                            value={car}
                            type="text"
                            id="horizontal-form-car"
                            aria-describedby="horizontal-form-car-helper"
                            name="horizontal-form-car"
                            onChange={handleCarChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Action"
                        fieldId="horizontal-form-action"
                    >
                        <TextInput
                            value={action}
                            type="text"
                            id="horizontal-form-action"
                            aria-describedby="horizontal-form-action-helper"
                            name="horizontal-form-action"
                            onChange={handleActionChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Object DN"
                        fieldId="horizontal-form-object-dn"
                    >
                        <TextInput
                            value={objectdn}
                            type="text"
                            id="horizontal-form-object-dn"
                            aria-describedby="horizontal-form-object-dn-helper"
                            name="horizontal-form-object-dn"
                            onChange={handleObjectdnChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Trustee DN"
                        fieldId="horizontal-form-trustee-dn"
                    >
                        <TextInput
                            value={trusteedn}
                            type="text"
                            id="horizontal-form-trustee-dn"
                            aria-describedby="horizontal-form-trustee-dn-helper"
                            name="horizontal-form-trustee-dn"
                            onChange={handleTrusteednChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="SDDL"
                        fieldId="horizontal-form-sddl"
                    >
                        <TextInput
                            value={sddl}
                            type="text"
                            id="horizontal-form-sddl"
                            aria-describedby="horizontal-form-sddl-helper"
                            name="horizontal-form-sddl"
                            onChange={handleSddlChange}
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
