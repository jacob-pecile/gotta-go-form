import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Form} from './src/form';
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

ReactDOM.render(
    <Form formDefinition={def} />,
  document.getElementById('app')
);