import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Form from './src/form';
import {FormDefinition, FormType} from './src/types/formtypes';

let def: FormDefinition = {
    sections: [
        {
            title: 'test',
            fields: [
                {
                    title: 'Input',
                    accessor: 'input',
                    type: FormType.Input,
                    callback: e => (console.log(e.target.value)),
                    value: ''
                }
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