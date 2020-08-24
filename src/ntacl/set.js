import React, { useState } from 'react';
import {
    Loading,
    ErrorToast,
    SuccessToast
} from '../common';
import {
    Form,
    FormGroup,
    TextInput,
    Modal,
    Button
} from '@patternfly/react-core';
import cockpit from 'cockpit';

export default function Set() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [xattrBackend, setXattrBackend] = useState('');
    const [eadbFile, setEadbFile] = useState('');
    const [useNtvfs, setUseNtvfs] = useState('');
    const [useS3fs, setUseS3fs] = useState('');
    const [service, setService] = useState('');
    const [file, setFile] = useState('');
    const [acl, setAcl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleXattrBackendChange = (e) => setXattrBackend(e);
    const handleEadbFileChange = (e) => setEadbFile(e);
    const handleUseNtvfsChange = (e) => setUseNtvfs(e);
    const handleUseS3fsChange = (e) => setUseS3fs(e);
    const handleServiceChange = (e) => setService(e);
    const handleFileChange = (e) => setFile(e);
    const handleAclChange = (e) => setAcl(e);
    const handleSubmit = (e) => {
        setLoading(true);
        const cmd = ["samba-tool", "ntacl", "set", `${acl}`, `${file}`];
        if (xattrBackend.length > 0) {
            cmd.push(`--xattr-backend=${xattrBackend}`);
        }
        if (eadbFile.length > 0) {
            cmd.push(`--eadb-file=${eadbFile}`);
        }
        if (useNtvfs.length > 0) {
            cmd.push(`--use-ntvfs=${useNtvfs}`);
        }
        if (useS3fs.length > 0) {
            cmd.push(`--use-s3fs=${useS3fs}`);
        }
        if (service.length > 0) {
            cmd.push(`--service=${service}`);
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
                Set ACLs of a file
            </Button>
            <Modal
                title="Set ACLs of a file"
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
                        label="Acl"
                        isRequired
                        fieldId="horizontal-form-acl"
                    >
                        <TextInput
                            value={acl}
                            type="text"
                            id="horizontal-form-acl"
                            aria-describedby="horizontal-form-acl-helper"
                            name="horizontal-form-acl"
                            onChange={handleAclChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="File"
                        isRequired
                        fieldId="horizontal-form-file"
                    >
                        <TextInput
                            value={file}
                            type="text"
                            id="horizontal-form-file"
                            aria-describedby="horizontal-form-file-helper"
                            name="horizontal-form-file"
                            onChange={handleFileChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Xattr backend type"
                        fieldId="horizontal-form-xattr-backend"
                    >
                        <TextInput
                            value={xattrBackend}
                            type="text"
                            id="horizontal-form-xattr-backend"
                            aria-describedby="horizontal-form-xattr-backend-helper"
                            name="horizontal-form-xattr-backend"
                            onChange={handleXattrBackendChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Eadb File"
                        fieldId="horizontal-form-eadb"
                    >
                        <TextInput
                            value={eadbFile}
                            type="text"
                            id="horizontal-form-eadb"
                            aria-describedby="horizontal-form-eadb-helper"
                            name="horizontal-form-eadb"
                            onChange={handleEadbFileChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Use ntvfs"
                        fieldId="horizontal-form-ntvfs"
                    >
                        <TextInput
                            value={useNtvfs}
                            type="text"
                            id="horizontal-form-ntvfs"
                            aria-describedby="horizontal-form-ntvfs-helper"
                            name="horizontal-form-ntvfs"
                            onChange={handleUseNtvfsChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Use s3fs"
                        fieldId="horizontal-form-s3fs"
                    >
                        <TextInput
                            value={useS3fs}
                            type="text"
                            id="horizontal-form-s3fs"
                            aria-describedby="horizontal-form-s3fs-helper"
                            name="horizontal-form-s3fs"
                            onChange={handleUseS3fsChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Service"
                        fieldId="horizontal-form-service"
                    >
                        <TextInput
                            value={service}
                            type="text"
                            id="horizontal-form-service"
                            aria-describedby="horizontal-form-service-helper"
                            name="horizontal-form-service"
                            onChange={handleServiceChange}
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
