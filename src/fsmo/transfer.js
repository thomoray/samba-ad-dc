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
    Button,
    Checkbox
} from '@patternfly/react-core';
import cockpit from 'cockpit';

export default function Transfer() {
    const [userName, setUserName] = useState();
    const [adminPass, setAdminPass] = useState();
    const [rid, setRid] = useState(false);
    const [schema, setSchema] = useState(false);
    const [pdc, setPdc] = useState(false);
    const [naming, setNaming] = useState(false);
    const [infrastructure, setInfrastructure] = useState(false);
    const [domainDns, setDomainDns] = useState(false);
    const [forestDns, setForestDns] = useState(false);
    const [all, setAll] = useState(false);

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleUserNameChange = (e) => setUserName(e);
    const handleAdminPassChange = (e) => setAdminPass(e);
    const handleAllChange = () => setAll(!all);
    const handleRidChange = () => setRid(!rid);
    const handleSchemaChange = () => setSchema(!schema);
    const handlePdcChange = () => setPdc(!pdc);
    const handleNamingChange = () => setNaming(!naming);
    const handleInfrastructureChange = (e) => setInfrastructure(!infrastructure);
    const handleDomainDnsChange = () => setDomainDns(!domainDns);
    const handleForestDnsChange = () => setForestDns(!forestDns);

    // rid=RidAllocationMasterRole
    // schema=SchemaMasterRole
    // pdc=PdcEmulationMasterRole
    // naming=DomainNamingMasterRole
    // infrastructure=InfrastructureMasterRole
    // domaindns=DomainDnsZonesMasterRole
    // forestdns=ForestDnsZonesMasterRole
    // all=all

    const handleSubmit = (e) => {
        setLoading(true);
        const cmd = ['samba-tool', 'fsmo', 'transfer', `--username=${userName}`, `--password=${adminPass}`];
        if (all) {
            cmd.push('--role=all');
        } else if (rid) {
            cmd.push('--role=rid');
        } else if (schema) {
            cmd.push('--role=schema');
        } else if (pdc) {
            cmd.push('--role=pdc');
        } else if (naming) {
            cmd.push('--role=naming');
        } else if (infrastructure) {
            cmd.push('--role=infrastructure');
        } else if (domainDns) {
            cmd.push('--role=domaindns');
        } else if (forestDns) {
            cmd.push('--role=forestdns');
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
                Transfer
            </Button>
            <Modal
                title="Transfer the role"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Transfer
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
                        label="Admin UserName"
                        isRequired
                        fieldId="horizontal-form-username"
                    >
                        <TextInput
                            value={userName}
                            type="text"
                            id="horizontal-form-username"
                            aria-describedby="horizontal-form-username-helper"
                            name="horizontal-form-username"
                            onChange={handleUserNameChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Admin Password"
                        isRequired
                        fieldId="horizontal-form-admin-password"
                    >
                        <TextInput
                            value={adminPass}
                            type="password"
                            id="horizontal-form-admin-password"
                            aria-describedby="horizontal-form-admin-password-helper"
                            name="horizontal-form-admin-password"
                            onChange={handleAdminPassChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Checkbox
                            label="All"
                            isChecked={all}
                            onChange={handleAllChange}
                            aria-label="all"
                            id="all"
                            name="all"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Checkbox
                            className="nested"
                            label="RidAllocationMasterRole"
                            isChecked={rid}
                            onChange={handleRidChange}
                            aria-label="rid"
                            id="rid"
                            name="rid"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Checkbox
                            className="nested"
                            label="SchemaMasterRole"
                            isChecked={schema}
                            onChange={handleSchemaChange}
                            aria-label="schema"
                            id="schema"
                            name="schema"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Checkbox
                            className="nested"
                            label="PdcEmulationMasterRole"
                            isChecked={pdc}
                            onChange={handlePdcChange}
                            aria-label="pdc"
                            id="pdc"
                            name="pdc"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Checkbox
                            className="nested"
                            label="DomainNamingMasterRole"
                            isChecked={naming}
                            onChange={handleNamingChange}
                            aria-label="naming"
                            id="naming"
                            name="naming"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Checkbox
                            className="nested"
                            label="InfrastructureMasterRole"
                            isChecked={infrastructure}
                            onChange={handleInfrastructureChange}
                            aria-label="infrastructure"
                            id="infrastructure"
                            name="infrastructure"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Checkbox
                            className="nested"
                            label="DomainDnsZonesMasterRole"
                            isChecked={domainDns}
                            onChange={handleDomainDnsChange}
                            aria-label="domain dns"
                            id="domain-dns"
                            name="domainDns"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Checkbox
                            className="nested"
                            label="ForestDnsZonesMasterRole"
                            isChecked={forestDns}
                            onChange={handleForestDnsChange}
                            aria-label="forest dns"
                            id="forest-dns"
                            name="forestDns"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
