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
import './css/computer.css';
import { SearchIcon } from '@patternfly/react-icons';

function ComputerList() {
    const [computerList, setComputerList] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const onSearchInputChange = (value) => setSearchValue(value);

    const hideAlert = () => {
        setAlertVisible(false);
    };

    const filteredList = computerList.filter((computer) => computer.includes(searchValue)).map(filteredComputer =>
        <li key={filteredComputer.toString()}>
            {filteredComputer}
        </li>
    );

    useEffect(() => {
        setLoading(true);
        const command = `samba-tool computer list`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    const splitData = data.split('\n');
                    const sortedData = splitData.sort();
                    setComputerList(sortedData);
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
                <h3 className="list-computer-heading">Computers in AD DC</h3>
                <InputGroup>
                    <TextInput
                    name="computerSearchInput"
                    id="computerSearchInput"
                    type="search"
                    aria-label="search computers"
                    onChange={onSearchInputChange}
                    value={searchValue}
                    />
                    <Button
                    variant={ButtonVariant.control}
                    aria-label="search button for search computers"
                    >
                        <SearchIcon />
                    </Button>
                </InputGroup>
                <Card>
                    <CardHeader>Computer List</CardHeader>
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

export default ComputerList;
