import React from 'react';
import {
    Alert,
    AlertActionCloseButton,
    Spinner
} from '@patternfly/react-core';

export const RenderError = (props) => {
    const hideAlert = props.hideAlert;
    if (props.alertVisible) {
        return (
            <Alert
            variant="danger"
            title="An Error Occurred"
            action={<AlertActionCloseButton onClose={hideAlert} />}
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
            action={<AlertActionCloseButton onClose={hideAlert} />}
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
