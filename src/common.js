import React from 'react';
import {
    Alert,
    AlertActionCloseButton,
    Spinner,
    Button
} from '@patternfly/react-core';
import { AngleLeftIcon } from '@patternfly/react-icons';
import './css/common.css';

export const RenderError = (props) => {
    const hideAlert = props.hideAlert;
    if (props.alertVisible) {
        return (
            <Alert
            variant="danger"
            title="An Error Occurred"
            actionClose={<AlertActionCloseButton onClose={hideAlert} />}
            >
                {props.error}
            </Alert>
        );
    }
    return <div />;
};

export const Success = (props) => {
    const hideAlert = props.hideAlert;
    if (props.alertVisible) {
        return (
            <Alert
            variant="success"
            title="Success"
            actionClose={<AlertActionCloseButton onClose={hideAlert} />}
            >
                {props.message}
            </Alert>
        );
    }
    return <div />;
};

export const Loading = (props) => {
    if (props.loading) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }
    return <div />;
};

export const BackButton = () => {
    return (
        <div className="back-button">
            <Button variant="tertiary" onClick={() => history.back()}>
                <AngleLeftIcon />
                Back
            </Button>
        </div>
    );
};
