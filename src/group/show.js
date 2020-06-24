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

export default function Show() {
    const [groupName, setgroupName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();

    const handlegroupNameChange = (e) => {
        setgroupName(e);
    };
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool group show ${groupName}`;
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
                title="Retrieved the Group AD Object"
                isOpen={successAlertVisible}
                onClose={() => successAlertVisible(false)}
                appendTo={document.body}
            >
                <div>{successMessage.map((line) => <h6 key={line.toString()}>{line}</h6>)}</div>
            </Modal>}
            <Button variant="secondary" onClick={handleModalToggle}>
                Show AD Object
            </Button>
            <Modal
                title="Show A group's AD Object"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for showing a group AD Object"
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
                        label="Group Name"
                        isRequired
                        fieldId="horizontal-form-group-name"
                    >
                        <TextInput
                            value={groupName}
                            type="text"
                            id="horizontal-form-group-name"
                            aria-describedby="horizontal-form-group-name-helper"
                            name="horizontal-form-group-name"
                            onChange={handlegroupNameChange}
                            placeholder="group1"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
