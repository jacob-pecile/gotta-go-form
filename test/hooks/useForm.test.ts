import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from '../../src/hooks/useForm';

import { input, checkbox } from '../../examples/fields';
import { FormDefinition, FormField } from '../../src/types/formtypes';
import { FooterAction } from '../../src/types/eventtypes';

let submit = jest.fn();
let print = jest.fn();
let inputClick = jest.fn();

input.callback = inputClick;

let def: FormDefinition = {
    sections: [
        {
            title: 'test',
            fields: [input]
        }
    ]
};

let actions: FooterAction[] = [
    {
        text: 'Submit',
        type: 'Primary',
        validate: true,
        onClick: submit
    },
    {
        text: 'Print',
        type: 'Secondary',
        onClick: print
    }
];


describe('Form Hook test', () => {

    beforeEach(() => {
        def = {
            sections: [
                {
                    title: 'test',
                    fields: [{ ...input }]
                }
            ]
        };
        submit.mockClear();
        inputClick.mockClear();
    });

    test('simple form, callbacks', () => {
        let { result } = renderHook(() => useForm(def, actions));
        let { definition, formfooterActions } = result.current;

        expect(definition.sections.length).toBe(1);

        let renderReadyInput = definition.sections[0].fields[0];

        expect(renderReadyInput.callback).not.toBe(inputClick);
        expect(renderReadyInput.isDirty).toBeFalsy();
        expect(formfooterActions.length).toBe(2);
        expect(formfooterActions[0].onClick).not.toBe(submit);
        expect(formfooterActions[1].onClick).not.toBe(print);

        act(() => {
            renderReadyInput.callback({ target: { value: 't' } });
        });

        expect(renderReadyInput.isDirty).toBeTruthy();
        expect(inputClick).toBeCalled();
        expect(definition.sections[0].fields[0].value).toBe('t');

        act(() => {
            formfooterActions[0].onClick();
        });

        expect(submit).toBeCalled();
    });

    test('simple form, mandatory checks', () => {
        let { result } = renderHook(() => useForm(def, actions));
        let { definition, formfooterActions } = result.current;

        expect(definition.sections.length).toBe(1);

        act(() => {
            formfooterActions[0].onClick();
        });
        let renderReadyInput = definition.sections[0].fields[0];

        expect(renderReadyInput.properties.invalidMessage).toBe('please put something here');

        expect(submit).not.toBeCalled();
    });

    test('simple form, validation', () => {
        def.sections[0].fields[0].validation = {
            validate: field => field.value === 'test',
            errorMessage: 'failed validation'
        };
        def.sections[0].fields[0].value = 't';

        let { result } = renderHook(() => useForm(def, actions));
        let { definition, formfooterActions } = result.current;

        let renderReadyInput = definition.sections[0].fields[0];

        act(() => {
            formfooterActions[0].onClick();
        });

        expect(renderReadyInput.properties.invalidMessage).toBe('failed validation');

        expect(submit).not.toBeCalled();
    });

    test('simple form, dependant validation', () => {
        def.sections[0].fields[0].validation = {
            accessors: ['checkbox'],
            validate: (field, checkbox) =>
                field.value === 'test' && checkbox.value,
            errorMessage: 'failed validation'
        };
        def.sections[0].fields[0].value = 'test';
        def.sections[0].fields.push(checkbox);

        let { result } = renderHook(() => useForm(def, actions));
        let { definition, formfooterActions } = result.current;

        let renderReadyInput = definition.sections[0].fields[0];
        let renderReadyCheckbox = definition.sections[0].fields[1];

        act(() => {
            formfooterActions[0].onClick();
        });

        expect(renderReadyInput.properties.invalidMessage).toBe('failed validation');

        expect(submit).not.toBeCalled();

        act(() => {
            renderReadyCheckbox.callback({ value: true });
            formfooterActions[0].onClick();
        });

        expect(renderReadyInput.properties.invalidMessage).toBeFalsy();
        expect(submit).toBeCalled();
    });

    test('simple form, multi validation', () => {
        def.sections[0].fields[0].validation = [{
            validate: (currentField) => currentField.value[0] === 's',
            errorMessage: 'input must start with a s'
        }, {
            validate: (currentField) => currentField.value[currentField.value.length - 1] === 'w',
            errorMessage: 'input must end with a w'
        }];
        def.sections[0].fields[0].value = 'sss';

        let { result } = renderHook(() => useForm(def, actions));
        let { definition, formfooterActions } = result.current;

        let renderReadyInput = definition.sections[0].fields[0];

        act(() => {
            formfooterActions[0].onClick();
        });

        expect(renderReadyInput.properties.invalidMessage).toBe('input must end with a w');

        expect(submit).not.toBeCalled();
    });

    test('simple form, visibility conditions', () => {
        let chbx: FormField = {
            ...checkbox,
            visibility: {
                accessors: ['input'],
                condition: (inputValue) =>
                    inputValue === 'show'
            }
        };
        def.sections.push({ fields: [chbx], title: 'test2' });

        let { result } = renderHook(() => useForm(def, actions));
        let { definition } = result.current;

        let renderReadyInput = definition.sections[0].fields[0];
        let renderReadyCheckbox = definition.sections[1].fields[0];
        expect(renderReadyCheckbox.visibility.isVisible).toBe(false);

        act(() => {
            renderReadyInput.callback({ target: { value: 'show' } });
        });

        expect(renderReadyCheckbox.visibility.isVisible).toBe(true);
    });

    test('simple form, observable conditions', () => {
        let chbx: FormField = {
            ...checkbox,
            observer: {
                observables: ['input'],
                observerFunction: (checkbox, input) => {
                    checkbox.value = input.value === 'o';
                    return checkbox;
                }
            }
        };
        def.sections.push({ fields: [chbx], title: 'test2' });

        let { result } = renderHook(() => useForm(def, actions));
        let { definition } = result.current;

        let renderReadyInput = definition.sections[0].fields[0];
        let renderReadyCheckbox = definition.sections[1].fields[0];
        expect(renderReadyCheckbox.value).toBe(false);

        act(() => {
            renderReadyInput.callback({ target: { value: 'o' } });
        });

        expect(renderReadyCheckbox.value).toBe(true);
    });
});