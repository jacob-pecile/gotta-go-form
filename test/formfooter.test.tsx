import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FooterAction } from '../src/types/eventtypes';
import { FormFooter } from '../src/formfooter';

let fire = jest.fn();
let fireAgain = jest.fn();
let footeractions: FooterAction[] = [];

describe('Form Footer Component', () => {

    beforeEach(() => {
        footeractions = [
            {
                text: 'Submit',
                type: 'Primary',
                onClick: fire
            }
        ];
    });

    test('simple footer with one callback', () => {
        render(<FormFooter actions={footeractions} />);

        let actionContainer = screen.queryByTestId('footer-action-container');

        expect(actionContainer.childElementCount).toBe(1);

        let action = actionContainer.children[0];
        fireEvent.click(action);

        expect(action.className).toContain('primary-btn');
        expect(fire).toBeCalled();
    });

    test('simple footer with two callback', () => {
        footeractions.push({
            text: 'test',
            type: 'Secondary',
            onClick: fireAgain
        });

        render(<FormFooter actions={footeractions} />);

        let actionContainer = screen.queryByTestId('footer-action-container');

        expect(actionContainer.childElementCount).toBe(2);

        let action = actionContainer.children[0];
        let secondAction = actionContainer.children[1];
        fireEvent.click(secondAction);

        expect(secondAction.className).toContain('secondary-btn');
        expect(action.className).toContain('primary-btn');
        expect(fireAgain).toBeCalled();
    });
});