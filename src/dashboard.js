import React from 'react';
import {
    Card,
    CardBody,
    Gallery,
    Page,
    PageSection,
} from '@patternfly/react-core';

export default function Dashboard() {
    return (
        <>
            <Page>
                <PageSection>
                    <Gallery gutter="md">
                        <a href="computer/index.html" role="link">
                            <Card isHoverable>
                                <CardBody>Computer Management</CardBody>
                            </Card>
                        </a>
                        <a href="domain/index.html" role="link">
                            <Card isHoverable>
                                <CardBody>Domain Management</CardBody>
                            </Card>
                        </a>
                        <a href="contact/index.html" role="link">
                            <Card isHoverable>
                                <CardBody>Contact Management</CardBody>
                            </Card>
                        </a>
                    </Gallery>
                </PageSection>
            </Page>
        </>
    );
}
