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
                        <a href="computer/computer.html" role="link">
                            <Card isHoverable>
                                <CardBody>Computer Management</CardBody>
                            </Card>
                        </a>
                        <a href="domain/domain.html" role="link">
                            <Card isHoverable>
                                <CardBody>Domain Management</CardBody>
                            </Card>
                        </a>
                        <a href="contact/contact.html" role="link">
                            <Card isHoverable>
                                <CardBody>Contact Management</CardBody>
                            </Card>
                        </a>
                        <a href="sites/sites.html" role="link">
                            <Card isHoverable>
                                <CardBody>Sites Management</CardBody>
                            </Card>
                        </a>
                        <a href="time/time.html" role="link">
                            <Card isHoverable>
                                <CardBody>Time</CardBody>
                            </Card>
                        </a>
                    </Gallery>
                </PageSection>
            </Page>
        </>
    );
}
