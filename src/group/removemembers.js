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

export default function RemoveMembers() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [group, setgroup] = useState("");
    const [members, setMembers] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handlegroupInputChange = (value) => setgroup(value);
    const handelMembersInputChange = (value) => setMembers(value);

    const handleSubmit = () => {
        setLoading(true);
        const command = `samba-tool group removemembers ${group} ${members}`;
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
            <Button variant="danger" onClick={handleModalToggle}>
                Remove Members
            </Button>
            <Modal
                title="Remove Group Members"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="Removes one or more members from an existing Active Directory
                group.  The input field accepts one or more group member names separated by
                commas.  A group member may be a user or computer account or another Active
                Directory group that is a member of the group specified on the command.
                When a member is removed from a group, inherited permissions and rights will
                no longer apply to the member."
                actions={[
                    <Button key="confirm" variant="danger" onClick={handleSubmit}>
                        Remove
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
                            placeholder="supergroup"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Members"
                        fieldId="horizontal-form-members"
                    >
                        <TextInput
                            value={members}
                            type="text"
                            id="horizontal-form-members"
                            aria-describedby="horizontal-form-members-helper"
                            name="horizontal-form-members"
                            onChange={handelMembersInputChange}
                            placeholder="User1"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
