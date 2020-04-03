import * as React from 'react';
import styled from 'styled-components';
import { FooterAction, ButtonType } from './types/eventtypes';

interface FormFooterProps {
    actions: FooterAction[];
    className?: string;
}

export const FormFooter = (props: FormFooterProps) => {

    let btnTypeCalculator = {
        [ButtonType.Primary]: 'primary-btn',
        [ButtonType.Secondary]: 'secondary-btn',
    };

    let actions = props.actions.map((action, i) => (
        <input key={i}
            type="button" disabled={action.disabled}
            className={`footer-btn ${btnTypeCalculator[action.type]}`}
            value={action.text}
            onClick={action.onClick}
        />
    ));

    return (
        <div className={props.className}>
            <div className="footer-action-container" data-testid="footer-action-container">
                {actions}
            </div>
        </div>
    );
};

export default styled(FormFooter)`
    display: flex;
    justify-content: flex-end;
    height: 48px;
    padding: 8px;
    background-color: #e5e5e5;
    border-top: solid 1px #d8d8d8;

    & > .footer-action-container{
        display: flex;

        & > .footer-btn{
            margin-left: 4px;
            border-radius: 3px;
            min-width: 80px;
            font-weight: 600;

            user-select: none;

            &.primary-btn{
                background-color: #4e7ea1;
                color: #ffffff;
                border: solid 1px #4e7ea1;
            }

            &.secondary-btn{
                background-color: #ffffff;
                border: solid 1px #1f1f1f;
            }

            &:hover{
                cursor: pointer;
            }
        }
    }
`;