import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardBody, Button, ButtonVariant, InputGroup, TextInput } from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import Create from './create';
import List from './list';

function User() {
    const [inputValue, setInputValue] = useState("");
    const onInputChange = (newValue) => {
        setInputValue(newValue);
    };

    return (
        <>
            <Card>
                <CardBody>
                    <Create />
                </CardBody>
            </Card>
            <InputGroup>
                <TextInput name="textInput2" id="textInput2" type="search" aria-label="search input example" onChange={onInputChange} value={inputValue} />
                <Button variant={ButtonVariant.control} aria-label="search button for search input">
                    <SearchIcon />
                </Button>
            </InputGroup>
            <List />
        </>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<User />, document.getElementById("user"));
});
