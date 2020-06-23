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
} from '../common';

export default function Show() {
    const [heuristicsValue, setHeuristicsValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();

    const handleHeuristicsValueChange = (e) => {
        setHeuristicsValue(e);
    };
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool forest directory_service dsheuristics ${heuristicsValue}`;
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
            <Button variant="primary" onClick={handleModalToggle}>
                Set dsheuristics
            </Button>
            <Modal
                title="Set the value of dsheuristics on the Directory Service."
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="This value alters the behaviour of the Directory Service on all domain
                controllers in the forest. Documentation related to this parameter can be
                found here: https://msdn.microsoft.com/en-us/library/cc223560.aspx"
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Set Value
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
                        label="Heuristics Value"
                        isRequired
                        fieldId="horizontal-form-value"
                    >
                        <TextInput
                            value={heuristicsValue}
                            type="text"
                            id="horizontal-form-value"
                            aria-describedby="horizontal-form-value-helper"
                            name="horizontal-form-value"
                            onChange={handleHeuristicsValueChange}
                            placeholder="0000002"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
