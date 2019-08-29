
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
    options: [
        {value: 1, label: 'gotta'},
        {value: 2, label: 'go'},
        {value: 3, label: 'fast'}
    ]
}