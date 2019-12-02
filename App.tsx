import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Form from './src/form';
import { FormDefinition } from './src/types/formtypes';

import {
	input,
	checkbox,
	dropdown,
	checkboxlist,
	radiolist,
	datetime,
	custom
} from './examples/fields';

let def: FormDefinition = {
	sections: [
		{
			title: 'test',
			fields: [
				input,
				checkbox,
				dropdown,
				checkboxlist,
				radiolist,
				datetime,
				custom
			]
		}
	]
};

let footeractions = [
	{
		text: 'Submit',
		type: 'Primary',
		validate: true,
		onClick: () => console.log('Submitted')
	}
];

ReactDOM.render(
	<Form formDefinition={def} footerActions={footeractions} showNavbar />,
	document.getElementById('app')
);
