import React, { useState } from 'react';
import cockpit from 'cockpit';
import {
    Modal,
    Button
} from '@patternfly/react-core';
import {
    Loading,
    ErrorToast
} from '../../common';

export default function ListTrusts() {
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();
    const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);

    const listTrusts = (e) => {
        setIsLoadingModalOpen(true);
        setLoading(true);
        const command = `samba-tool domain trust list`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    const splitData = data.split('\n');
                    setSuccessMessage(splitData);
                    setSuccessAlertVisible(true);
                    setLoading(false);
                    setIsLoadingModalOpen(false);
                })
                .catch((exception) => {
                    if (exception != null) {
                        setErrorMessage(exception.message);
                        setErrorAlertVisible(true);
                        setLoading(false);
                        setIsLoadingModalOpen(false);
                    }
                });
        return script();
    };
    return (
        <>
            {errorAlertVisible && <ErrorToast errorMessage={errorMessage} closeModal={() => setErrorAlertVisible(false)} />}
            {successAlertVisible &&
            <Modal
                title="Trusts List"
                isOpen={successAlertVisible}
                onClose={() => setSuccessAlertVisible(false)}
                appendTo={document.body}
            >
                <div>{successMessage.map((line) => <h6 key={line.toString()}>{line}</h6>)}</div>
            </Modal>}
            <Button variant="secondary" onClick={listTrusts}>
                List Trusts
            </Button>
            <Modal
                title="Loading Trusts Lists"
                isOpen={isLoadingModalOpen}
                onClose={() => setIsLoadingModalOpen(false)}
                appendTo={document.body}
            >
                <Loading loading={loading} />
            </Modal>
        </>
    );
}
