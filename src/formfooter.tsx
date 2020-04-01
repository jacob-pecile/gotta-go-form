import * as React from 'react';
import styled from 'styled-components';
import { FooterAction, ButtonType } from './types/eventtypes';
import classNames from 'classnames';

interface FormFooterProps {
    actions: FooterAction[];
    className?: string;
}

const FormFooter = (props: FormFooterProps) => {

    let actions = props.actions.map((action, i) => (
        <input key={i} type="button" disabled={action.disabled} className={classNames('footer-btn',
            { 'primary-btn': action.type === ButtonType.Primary },
            { 'secondary-btn': action.type === ButtonType.Secondary })}
            value={action.text}
            onClick={action.onClick}
        />
    ));

    return (
        <div className={props.className}>
            <div className="footer-action-container">
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
            font-family: 'Open Sans', sans-serif;
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