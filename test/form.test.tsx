import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { input } from '../examples/fields';
import { FormDefinition } from '../src/types/formtypes';
import { Form } from '../src/form';


let def: FormDefinition = {
    sections: [
        {
            title: 'test',
            fields: []
        }
    ]
};

describe('Form Component', () => {

    beforeEach(() => {
        def = {
            sections: [
                {
                    title: 'test',
                    fields: []
                }
            ]
        };
    });

    test('simple form with navbar and title', () => {
        def.title = 'My Form';
        def.sections[0].fields.push(input);
        render(<Form formDefinition={def} showNavbar footerActions={[]} />);

        let sectionContainer = screen.queryByTestId('section-container');
        let main = screen.queryByTestId('main-form-content');
        let formContainer = screen.queryByTestId('main-form-container');

        expect(sectionContainer.childElementCount).toBe(1);
        expect(main.childElementCount).toBe(2);
        expect(formContainer.childElementCount).toBe(2);
        expect(formContainer.children[0].classList).toContain('form-header');
    });

    test('simple form with custom header', () => {
        def.sections[0].fields.push(input);
        render(<Form
            formDefinition={def}
            showNavbar
            footerActions={[]}
            Header={() => <div>I'll make my own form header</div>}
        />);

        let formContainer = screen.queryByTestId('main-form-container');
        expect(formContainer.children[0].classList).not.toContain('form-header');

        expect(formContainer.children[0].textContent).toBe('I\'ll make my own form header');
    });

    test('simple form 1 section two fields with no navbar and no title', () => {
        def.sections[0].fields.push(input, input);
        render(<Form formDefinition={def} footerActions={[]} />);

        let sectionContainer = screen.queryByTestId('section-container');
        let main = screen.queryByTestId('main-form-content');
        let formContainer = screen.queryByTestId('main-form-container');

        expect(sectionContainer.childElementCount).toBe(1);
        expect(main.childElementCount).toBe(1);
        expect(formContainer.childElementCount).toBe(1);
    });

    test('long form 2 sections  with no navbar', () => {
        def.sections[0].fields.push(input);
        def.sections.push({
            title: 'test2',
            fields: [input]
        });
        render(<Form formDefinition={def} footerActions={[]} />);

        let sectionContainer = screen.queryByTestId('section-container');
        let main = screen.queryByTestId('main-form-content');

        expect(sectionContainer.childElementCount).toBe(2);
        expect(main.childElementCount).toBe(1);
    });
});