import React, { useState } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    textCenter,
} from '@patternfly/react-table';
import {
    Card,
    CardBody,
} from '@patternfly/react-core';
// import './computer.css';

function ComputerList() {
    const [columns, setColumns] = useState([
        { title: 'Repositories' },
        'Branches',
        { title: 'Pull requests' },
        'Workspaces',
        {
            title: 'Last Commit',
            transforms: [textCenter],
            cellTransforms: [textCenter]
        }
    ]);
    const [rows, setRows] = useState([
        {
            cells: ['one', 'two', 'three', 'four', 'five']
        },
        {
            cells: [
                {
                    title: <div>one - 2</div>,
                    props: { title: 'hover title', colSpan: 3 }
                },
                'four - 2',
                'five - 2'
            ]
        },
        {
            cells: [
                'one - 3',
                'two - 3',
                'three - 3',
                'four - 3',
                {
                    title: 'five - 3 (not centered)',
                    props: { textCenter: false }
                }
            ]
        }
    ]);

    return (
        <>
            <Table aria-label="Computers List" cells={columns} rows={rows}>
                <TableHeader />
                <TableBody />
            </Table>
            <Card isHoverable>
                <CardBody>Card Body</CardBody>
            </Card>
        </>
    );
}

export default ComputerList;
