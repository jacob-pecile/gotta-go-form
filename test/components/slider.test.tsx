import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { slider } from '../../examples/fields';
import Slider from '../../src/components/slider';

describe('Dropdown Component', () => {

    beforeEach(() => {
        slider.value = undefined;
        slider.properties = undefined;
    });

    test('simple slider, default properties', () => {
        let value = 0;
        slider.callback = (event) => (value = event.target.value);
        render(<Slider field={slider} />);

        let container = screen.queryByTestId('form-slider-container');
        let input: any = screen.queryByTestId('form-slider');

        expect(input.value).toBe('0');
        expect(input.min).toBe('0');
        expect(input.max).toBe('10');
        expect(input.step).toBe('1');

        let tooltip = container.querySelector('span.slider-title');
        expect(tooltip).not.toBeNull();
        expect(tooltip.textContent).toBe('0');

        fireEvent.change(input, { target: { value: '2' } });
        expect(value).toBe('2');
    });

    test('simple slider, set properties', () => {
        slider.properties = { min: 5, max: 100, step: 2 };
        slider.value = 13;
        render(<Slider field={slider} />);

        let input: any = screen.queryByTestId('form-slider');

        expect(input.value).toBe('13');
        expect(input.min).toBe('5');
        expect(input.max).toBe('100');
        expect(input.step).toBe('2');

    });

    test('range slider, default properties', () => {
        let value;
        slider.callback = (event) => { value = event.target.value; };
        slider.properties = { isRange: true };
        render(<Slider field={slider} />);

        let container = screen.queryByTestId('form-slider-container');
        let input: any = screen.queryByTestId('form-slider');
        let rangeInput: any = screen.queryByTestId('form-range-slider');

        expect(input.value).toBe('0');
        expect(rangeInput.value).toBe('10');

        let rangeView = screen.queryByTestId('range-value');
        expect(rangeView).not.toBeNull();
        expect(rangeView.textContent).toBe('0 - 10');

        fireEvent.change(input, { target: { value: '2' } });
        expect(value[0]).toBe(2);
        expect(value[1]).toBe(10);

        fireEvent.change(rangeInput, { target: { value: '1' } });
        expect(value[0]).toBe(0);
        expect(value[1]).toBe(1);

        let tooltip = container.querySelector('span.slider-title');
        expect(tooltip).toBeNull();
    });
});