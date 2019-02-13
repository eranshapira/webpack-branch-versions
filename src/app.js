console.log(performance.now(), 'App loaded');
import React from 'react';
import ReactDOM from 'react-dom';

const reactElement = React.createElement('button', {}, 'Awesome button!');
const hostElement = document.createElement('div');
document.body.appendChild(hostElement);
ReactDOM.render(reactElement, hostElement);