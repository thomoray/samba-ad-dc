import cockpit from 'cockpit';
import React, { useState, useEffect } from 'react';

export default function DomainInfo() {
    // const [info, setInfo] = useState({});
    const [ipAddress, setIPAdress] = useState('127.0.0.1');

    const command = `samba-tool domain info ${ipAddress}`;

    const getInfo = () => cockpit.script(command, { superuser: true, err: 'message' });

    useEffect(() => {
        getInfo()
                .done((data) => {
                    // setInfo(data);
                    console.log('Done');
                    console.log(data);
                })
                .catch((exception) => {
                    console.log('Exception');
                    console.log(exception);
                });
    }
    );
    return (
        <div>
            <h1>Main Domain Component</h1>
        </div>
    );
}
