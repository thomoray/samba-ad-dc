import React from 'react';
import {
    Card,
    CardBody,
    Gallery,
    GalleryItem,
    Page,
    PageSection,
} from '@patternfly/react-core';

export default function Main() {
    return (
        <>
            <Page>
                <PageSection>
                    <Gallery hasGutter>
                        <GalleryItem>
                            <a href="computer/computer.html" role="link">
                                <Card isHoverable>
                                    <CardBody>Computer Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="domain/domain.html" role="link">
                                <Card isHoverable>
                                    <CardBody>Domain Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="contact/contact.html" role="link">
                                <Card isHoverable>
                                    <CardBody>Contact Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="user/user.html" role="link">
                                <Card isHoverable>
                                    <CardBody>User Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="sites/sites.html" role="link">
                                <Card isHoverable>
                                    <CardBody>Sites Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="time/time.html" role="link">
                                <Card isHoverable>
                                    <CardBody>Time</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="organization_unit/orgunit.html" role="link">
                                <Card isHoverable>
                                    <CardBody>Organization Units Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="forest/forest.html" role="link">
                                <Card isHoverable>
                                    <CardBody>Forest Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="group/group.html" role="link">
                                <Card isHoverable>
                                    <CardBody>Group Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="dns/dns.html" role="link">
                                <Card isHoverable>
                                    <CardBody>DNS Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="delegation/delegation.html" role="link">
                                <Card isHoverable>
                                    <CardBody>Delegation Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="spn/spn.html" role="link">
                                <Card isHoverable>
                                    <CardBody>SPN Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="fsmo/fsmo.html" role="link">
                                <Card isHoverable>
                                    <CardBody>FSMO Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="gpo/gpo.html" role="link">
                                <Card isHoverable>
                                    <CardBody>GPO Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="dsacl/dsacl.html" role="link">
                                <Card isHoverable>
                                    <CardBody> DS ACLs Manipulation</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="ntacl/ntacl.html" role="link">
                                <Card isHoverable>
                                    <CardBody> NT ACLs Manipulation</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                    </Gallery>
                </PageSection>
            </Page>
        </>
    );
}
