import React, { useState, useEffect } from 'react';
import cockpit from 'cockpit';
import { Loading, RenderError } from '../common';
import {
    Card,
    CardBody,
    CardHeader,
    InputGroup,
    Button,
    ButtonVariant,
    TextInput
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';

export default function GroupList() {
    const [groupList, setgroupList] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const onSearchInputChange = (value) => setSearchValue(value);

    const hideAlert = () => {
        setAlertVisible(false);
    };

    const filteredList = groupList.filter((group) => group.includes(searchValue)).map(filteredgroup =>
        <li key={filteredgroup.toString()}>
            {filteredgroup}
        </li>
    );

    useEffect(() => {
        setLoading(true);
        const command = `samba-tool group list`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    const splitData = data.split('\n');
                    const sortedData = splitData.sort();
                    setgroupList(sortedData);
                    setLoading(false);
                })
                .catch((exception) => {
                    setError(exception.message);
                    setAlertVisible(true);
                    setLoading(false);
                });
        script();
    }, []);

    return (
        <>
            <div>
                <InputGroup>
                    <TextInput
                    name="groupSearchInput"
                    id="groupSearchInput"
                    type="search"
                    aria-label="search groups"
                    onChange={onSearchInputChange}
                    value={searchValue}
                    />
                    <Button
                    variant={ButtonVariant.control}
                    aria-label="search button for search groups"
                    >
                        <SearchIcon />
                    </Button>
                </InputGroup>
                <Card>
                    <CardHeader>Group List</CardHeader>
                    <CardBody>
                        <Loading loading={loading} />
                        <RenderError hideAlert={hideAlert} error={error} alertVisible={alertVisible} />
                        {filteredList}
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
