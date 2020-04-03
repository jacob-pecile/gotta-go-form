import * as React from 'react';
import { Fragment } from 'react';
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

import { createGlobalStyle } from 'styled-components';

const GlobalStyles: any = createGlobalStyle`
    @font-face {
		font-family: 'Open Sans';
		font-style: normal;
		src: url('fonts/OpenSans-Regular.ttf') format('truetype');
	}
	
`;

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
		onClick: (form) => console.log(form)
	}
];

ReactDOM.render(
	<Fragment>
		<GlobalStyles />
		<Form formDefinition={def} footerActions={footeractions} showNavbar />
	</Fragment>,
	document.getElementById('app')
);
