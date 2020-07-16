import React, { useState } from "react";
import { Loading, SuccessToast, ErrorToast } from "../common";
import {
    Form,
    FormGroup,
    TextInput,
    Modal,
    Button,
    FormSelect,
    FormSelectOption,
} from "@patternfly/react-core";
import cockpit from "cockpit";

export default function AnyService() {
    const [accountName, setAccountName] = useState("");
    const [serviceState, setserviceState] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const serviceStateOptions = [
        { value: "off", label: "off", disabled: false },
        { value: "on", label: "on", disabled: false },
    ];

    const handleServiceStateChange = (e) => setserviceState(e);
    const handleAccountNameChange = (e) => setAccountName(e);
    const handleSubmit = (e) => {
        setLoading(true);
        const command = `samba-tool delegation for-any-service ${accountName} ${serviceState}`;
        const script = () =>
            cockpit
                    .script(command, { superuser: true, err: "message" })
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
            {errorAlertVisible && (
                <ErrorToast
          errorMessage={errorMessage}
          closeModal={() => setErrorAlertVisible(false)}
                />
            )}
            {successAlertVisible && (
                <SuccessToast
          successMessage={successMessage}
          closeModal={() => setSuccessAlertVisible(false)}
                />
            )}
            <Button variant="secondary" onClick={handleModalToggle}>
                Any Service
            </Button>
            <Modal
        title="For Any Service"
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        description="Set/unset UF_TRUSTED_FOR_DELEGATION for an account."
        actions={[
            <Button key="confirm" variant="primary" onClick={handleSubmit}>
                Set
            </Button>,
            <Button key="cancel" variant="link" onClick={handleModalToggle}>
                Cancel
            </Button>,
            <Loading key="loading" loading={loading} />,
        ]}
        appendTo={document.body}
            >
                <Form isHorizontal>
                    <FormGroup
            label="Account Name"
            isRequired
            fieldId="horizontal-form-account-name"
                    >
                        <TextInput
              value={accountName}
              type="text"
              id="horizontal-form-account-name"
              aria-describedby="horizontal-form-account-name-helper"
              name="horizontal-form-account-name"
              onChange={handleAccountNameChange}
              placeholder="account1"
                        />
                    </FormGroup>
                    <FormGroup label="Role" isRequired fieldId="horizontal-form-role">
                        <FormSelect
                value={serviceState}
                onChange={handleServiceStateChange}
                id="horzontal-form-role"
                name="horizontal-form-role"
                aria-label="Role"
                        >
                            {serviceStateOptions.map((option, index) => (
                                <FormSelectOption
                  key={index}
                  value={option.value}
                  label={option.label}
                                />
                            ))}
                        </FormSelect>
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
