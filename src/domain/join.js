import React, { useState } from 'react';
import cockpit from 'cockpit';
import {
    Form,
    FormGroup,
    TextInput,
    Modal,
    Button,
    FormSelect,
    FormSelectOption
} from '@patternfly/react-core';
import {
    Loading,
    ErrorToast,
    SuccessToast
} from '../common';

export default function JoinDomain() {
    const [dnsDomain, setDnsDomain] = useState('');
    const [role, setRole] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();
    const [parentDomain, setParentDomain] = useState('');
    const [adminpass, setAdminPass] = useState('');
    const [server, setServer] = useState('');
    const [site, setSite] = useState('');
    const [dnsBackend, setDnsBackend] = useState('');
    const [machinePass, setMachinePass] = useState('');
    const [backendStore, setBackendStore] = useState('');
    const [backendStoreSize, setBackendStoreSize] = useState('');
    const [targetDir, setTargetDir] = useState('');

    const handleDnsDomainChange = (e) => setDnsDomain(e);
    const handleRoleChange = (e) => setRole(e);
    const handleParentDomainChange = (e) => setParentDomain(e);
    const handleAdminPassChange = (e) => setAdminPass(e);
    const handleServerChange = (e) => setServer(e);
    const handleSiteChange = (e) => setSite(e);
    const handleDnsBackendChange = (e) => setDnsBackend(e);
    const handleMachinePassChange = (e) => setMachinePass(e);
    const handleBackendStoreChange = (e) => setBackendStore(e);
    const handleBackendStoreSizeChange = (e) => setBackendStoreSize(e);
    const handleTargetDirChange = (e) => setTargetDir(e);

    const serverRole = [
        { value: 'DC', label: 'DC', disabled: false },
        { value: 'RODC', label: 'RODC', disabled: false },
        { value: 'MEMBER', label: 'MEMBER', disabled: false },
    ];

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const cmd = ["samba-tool", "domain", "join", `${dnsDomain}`, `${role}`];
        if (parentDomain.length > 0) {
            cmd.push(`--parent-domain=${parentDomain}`);
        }
        if (adminpass.length > 0) {
            cmd.push(`--adminpass=${adminpass}`);
        }
        if (server.length > 0) {
            cmd.push(`--server=${server}`);
        }
        if (site.length > 0) {
            cmd.push(`--site=${site}`);
        }
        if (dnsBackend.length > 0) {
            cmd.push(`--dns-backend=${dnsBackend}`);
        }
        if (machinePass.length > 0) {
            cmd.push(`--machinepass=${machinePass}`);
        }
        if (backendStore.length > 0) {
            cmd.push(`--backend-store=${backendStore}`);
        }
        if (backendStoreSize.length > 0) {
            cmd.push(`--backend-store-size=${backendStoreSize}`);
        }
        if (targetDir.length > 0) {
            cmd.push(`--targetdir=${targetDir}`);
        }
        const script = () => cockpit.script(cmd, { superuser: true, err: 'message' })
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
            <Button variant="secondary" onClick={handleModalToggle}>
                Join Domain
            </Button>
            <Modal
                title="Join Domain"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="Join domain as either member or backup domain controller."
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Join
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
                        label="DNS Domain"
                        isRequired
                        fieldId="horizontal-form-dns-domain"
                    >
                        <TextInput
                            value={dnsDomain}
                            type="text"
                            id="horizontal-form-dns-domain"
                            aria-describedby="horizontal-form-dns-domain-helper"
                            name="horizontal-form-dns-domain"
                            onChange={handleDnsDomainChange}
                        />
                    </FormGroup>
                    <FormGroup label="Role" isRequired fieldId="horizontal-form-role">
                        <FormSelect
                            value={role}
                            onChange={handleRoleChange}
                            id="horzontal-form-role"
                            name="horizontal-form-role"
                            aria-label="Role"
                        >
                            {serverRole.map((option, index) => (
                                <FormSelectOption key={index} value={option.value} label={option.label} />
                            ))}
                        </FormSelect>
                    </FormGroup>
                    <FormGroup
                        label="Parent Domain"
                        fieldId="horizontal-form-parent-domain"
                    >
                        <TextInput
                            value={parentDomain}
                            type="text"
                            id="horizontal-form-parent-domain"
                            aria-describedby="horizontal-form-parent-domain-helper"
                            name="horizontal-form-parent-domain"
                            onChange={handleParentDomainChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Admin Pass"
                        fieldId="horizontal-form-admin-pass"
                    >
                        <TextInput
                            value={adminpass}
                            type="password"
                            id="horizontal-form-admin-pass"
                            aria-describedby="horizontal-form-admin-pass-helper"
                            name="horizontal-form-admin-pass"
                            onChange={handleAdminPassChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Server"
                        fieldId="horizontal-form-server"
                    >
                        <TextInput
                            value={server}
                            type="text"
                            id="horizontal-form-server"
                            aria-describedby="horizontal-form-server-helper"
                            name="horizontal-form-server"
                            onChange={handleServerChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Site"
                        fieldId="horizontal-form-site"
                    >
                        <TextInput
                            value={site}
                            type="text"
                            id="horizontal-form-site"
                            aria-describedby="horizontal-form-site-helper"
                            name="horizontal-form-site"
                            onChange={handleSiteChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="DNS Backend"
                        fieldId="horizontal-form-dnsBackend"
                    >
                        <TextInput
                            value={dnsBackend}
                            type="text"
                            id="horizontal-form-dnsBackend"
                            aria-describedby="horizontal-form-dnsBackend-helper"
                            name="horizontal-form-dnsBackend"
                            onChange={handleDnsBackendChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Machine Pass"
                        fieldId="horizontal-form-machinePass"
                    >
                        <TextInput
                            value={machinePass}
                            type="password"
                            id="horizontal-form-machinePass"
                            aria-describedby="horizontal-form-machinePass-helper"
                            name="horizontal-form-machinePass"
                            onChange={handleMachinePassChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Backend Store"
                        fieldId="horizontal-form-backendStore"
                    >
                        <TextInput
                            value={backendStore}
                            type="text"
                            id="horizontal-form-backendStore"
                            aria-describedby="horizontal-form-backendStore-helper"
                            name="horizontal-form-backendStore"
                            onChange={handleBackendStoreChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Backend Store Size"
                        fieldId="horizontal-form-backendStoreSize"
                    >
                        <TextInput
                            value={backendStoreSize}
                            type="text"
                            id="horizontal-form-backendStoreSize"
                            aria-describedby="horizontal-form-backendStoreSize-helper"
                            name="horizontal-form-backendStoreSize"
                            onChange={handleBackendStoreSizeChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Target Dir"
                        fieldId="horizontal-form-targetDir"
                    >
                        <TextInput
                            value={targetDir}
                            type="text"
                            id="horizontal-form-targetDir"
                            aria-describedby="horizontal-form-targetDir-helper"
                            name="horizontal-form-targetDir"
                            onChange={handleTargetDirChange}
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
