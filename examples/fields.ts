
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