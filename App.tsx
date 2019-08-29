import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Form from './src/form';
import {FormDefinition} from './src/types/formtypes';

import {input, checkbox} from './examples/fields';

let def: FormDefinition = {
    sections: [
        {
            title: 'test',
            fields: [
                input, checkbox
            ]
        }
    ]
}

let footeractions = [
    {
        text: 'Submit',
        type: 'Primary',
        onClick: () => (console.log('Submitted'))
    }
];

ReactDOM.render(
    <Form formDefinition={def} footerActions={footeractions}/>,
  document.getElementById('app')
);