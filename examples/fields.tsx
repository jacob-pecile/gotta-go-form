import * as React from 'react';
import * as types from '../src/types/formtypes';

export const input: types.FormField = {
	title: 'Input',
	accessor: 'input',
	type: types.FormType.Input,
	callback: e => console.log(e.target.value),
	mandatoryMessage: 'please put something here',
	properties: { inputProps: { maxLength: 5 } }
};

export const checkbox: types.FormField = {
	title: 'CheckBox',
	accessor: 'checkbox',
	type: types.FormType.Checkbox,
	callback: e => console.log(e),
};

export const dropdown: types.FormField = {
	title: 'DropDown',
	accessor: 'dropdown',
	type: types.FormType.DropDown,
	callback: e => console.log(e),
	options: [
		{ value: 1, label: 'gotta' },
		{ value: 2, label: 'go' },
		{ value: 3, label: 'fast' }
	],
	mandatoryMessage: 'pick something'
};

export const checkboxlist: types.FormField = {
	title: 'CheckBoxList',
	accessor: 'checkboxlist',
	type: types.FormType.CheckboxList,
	callback: e => console.log(e),
	properties: { layout: 'horizontal' },
	options: [
		{ value: 1, label: 'gotta' },
		{ value: 2, label: 'go' },
		{ value: 3, label: 'fast' }
	],
	visibility: {
		accessors: ['dropdown', 'input'],
		condition: (dropdownValue, inputValue) =>
			inputValue === 'show' && dropdownValue === 1
	}
};

export const radiolist: types.FormField = {
	title: 'RadioList',
	accessor: 'radiolist',
	type: types.FormType.RadioButtonList,
	callback: e => console.log(e),
	value: 2,
	properties: { layout: 'horizontal' },
	options: [
		{ value: 1, label: 'gotta' },
		{ value: 2, label: 'go' },
		{ value: 3, label: 'fast' }
	],
	validation: {
		accessors: ['checkboxlist'],
		validate: (field, checkboxListField) =>
			field.value && field.value === 2 && checkboxListField.value && checkboxListField.value.indexOf(2) >= 0,
		errorMessage: 'you have to select the second option in two places'
	}
};

export const datetime: types.FormField = {
	title: 'DateTime',
	accessor: 'datetime',
	type: types.FormType.DateTime,
	callback: e => console.log(e),
	properties: { format: 'MM-dd-yyyy' }
};

export const custom: types.FormField = {
	title: 'Custom',
	accessor: 'custom',
	type: types.FormType.Custom,
	callback: e => console.log(e),
	customComponent: field => (
		<input
			data-testid="custom-component"
			value={field.value}
			onChange={e => {
				field.callback(e.target.value);
			}}
		/>
	)
};
