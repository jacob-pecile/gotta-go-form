import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { input, checkbox, custom } from '../examples/fields';
import { Section } from '../src/types/formtypes';
import { FormSection } from '../src/formsection';


let section: Section = {
    title: 'test',
    fields: []
};

describe('Form Component', () => {

    beforeEach(() => {
        section = {
            title: 'test',
            fields: []
        };
    });

    test('simple section with one field', () => {
        section.fields.push(input);
        render(<FormSection sectionIndex={0} section={section} />);

        let fieldContainer = screen.queryByTestId('form-field-container');
        let titleContainer = screen.queryByTestId('section-title-container');

        expect(fieldContainer.childElementCount).toBe(1);
        expect(titleContainer.querySelector('span').textContent).toBe('test');
    });

    test('simple section with two fields', () => {
        section.fields.push(input, checkbox);
        render(<FormSection sectionIndex={0} section={section} />);

        let fieldContainer = screen.queryByTestId('form-field-container');

        expect(fieldContainer.childElementCount).toBe(2);

        expect(fieldContainer.querySelector('.form-input-container')).not.toBeNull();
        expect(fieldContainer.querySelector('.form-checkbox')).not.toBeNull();
    });

    test('simple section with custom component', () => {
        section.fields.push(custom);
        render(<FormSection sectionIndex={0} section={section} />);

        let fieldContainer = screen.queryByTestId('form-field-container');
        let customComponent = screen.queryByTestId('custom-component');

        expect(fieldContainer.childElementCount).toBe(1);
        expect(customComponent).not.toBeNull();
    });
});