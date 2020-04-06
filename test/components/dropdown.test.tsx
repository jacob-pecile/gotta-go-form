import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { dropdown, multiDropdown } from '../../examples/fields';
import Dropdown from '../../src/components/dropdown';

describe('Dropdown Component', () => {

    beforeEach(() => {
        dropdown.value = undefined;

        multiDropdown.value = undefined;
    });

    test('simple dropdown, does it convert value to react-select value', async () => {
        dropdown.value = 1;
        render(<Dropdown field={dropdown} />);

        let container = screen.queryByTestId('form-dropdown-container');

        let select = container.querySelector('.form-dropdown .dd__single-value');
        expect(select.textContent).toBe('gotta');
    });

    test('simple Multidropdown, does it convert value to react-select value', () => {
        multiDropdown.value = [1, 3];
        render(<Dropdown field={multiDropdown} />);

        let container = screen.queryByTestId('form-dropdown-container');

        let select = container.querySelectorAll('.form-dropdown .dd__multi-value');
        expect(select.length).toBe(2);
        expect(select[1].firstChild.textContent).toBe('fast');
    });
});