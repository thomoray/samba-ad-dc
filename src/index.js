import "core-js/stable";

import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from './app.jsx';

document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(React.createElement(Application, {}), document.getElementById('app'));
});
