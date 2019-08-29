
import * as React from 'react';
import * as types from '../src/types/formtypes';

export const input = {
    title: 'Input',
    accessor: 'input',
    type: types.FormType.Input,
    callback: e => (console.log(e.target.value)),
    value: ''
}

export const checkbox = {
    title: 'CheckBox',
    accessor: 'checkbox',
    type: types.FormType.Checkbox,
    callback: e => (console.log(e)),
    value: false
}

export const dropdown = {
    title: 'DropDown',
    accessor: 'dropdown',
    type: types.FormType.DropDown,
    callback: e => (console.log(e)),
    value: null,
    options: [
        {value: 1, label: 'gotta'},
        {value: 2, label: 'go'},
        {value: 3, label: 'fast'}
    ]
}

export const checkboxlist = {
    title: 'CheckBoxList',
    accessor: 'checkboxlist',
    type: types.FormType.CheckboxList,
    callback: e => (console.log(e)),
    value: [],
    properties: {layout: 'horizontal'},
    options: [
        {value: 1, label: 'gotta'},
        {value: 2, label: 'go'},
        {value: 3, label: 'fast'}
    ]
}

export const radiolist = {
    title: 'RadioList',
    accessor: 'radiolist',
    type: types.FormType.RadioButtonList,
    callback: e => (console.log(e)),
    value: null,
    properties: {layout: 'horizontal'},
    options: [
        {value: 1, label: 'gotta'},
        {value: 2, label: 'go'},
        {value: 3, label: 'fast'}
    ]
}

export const datetime = {
    title: 'DateTime',
    accessor: 'datetime',
    type: types.FormType.DateTime,
    callback: e => (console.log(e)),
    value: '',
    properties: {dateformat: 'MM-DD-YYYY'}
}

export const custom = {
    title: 'Custom',
    accessor: 'custom',
    type: types.FormType.Custom,
    callback: e => (console.log(e)),
    value: '',
    customComponent: (field) => <input value={field.value} onChange={(e) => {field.callback(e.target.value)}} />
}