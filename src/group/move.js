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

export default function MoveGroup() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [group, setgroup] = useState("");
    const [ouContainer, setOuContainer] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handlegroupInputChange = (value) => setgroup(value);
    const handelOuContainerInputChange = (value) => setOuContainer(value);

    const handleSubmit = () => {
        setLoading(true);
        const command = `samba-tool group move ${group} ${ouContainer}`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
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
            <Button variant="secondary" onClick={handleModalToggle}>
                Move Group
            </Button>
            <Modal
                title="Move Group"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for moving group object into the specified organizational unit
                or container."
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Move
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
                        label="Group"
                        isRequired
                        fieldId="horizontal-form-orgunit"
                    >
                        <TextInput
                            value={group}
                            type="text"
                            id="horizontal-form-orgunit"
                            aria-describedby="horizontal-form-orgunit-helper"
                            name="horizontal-form-orgunit"
                            onChange={handlegroupInputChange}
                            placeholder="group1"
                        />
                    </FormGroup>
                    <FormGroup
                        label="OU/Container"
                        fieldId="horizontal-form-ou-container"
                    >
                        <TextInput
                            value={ouContainer}
                            type="text"
                            id="horizontal-form-ou-container"
                            aria-describedby="horizontal-form-ou-container-helper"
                            name="horizontal-form-ou-container"
                            onChange={handelOuContainerInputChange}
                            placeholder="'OU=OrgUnit'"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
