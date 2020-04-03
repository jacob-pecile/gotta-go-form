import * as React from 'react';
import styled from 'styled-components';
import { FormField } from '../types/formtypes';
import Icon from '@mdi/react';
import { mdiCheckboxBlankOutline, mdiCheckboxMarked } from '@mdi/js';

interface FormCheckBoxProps {
    field: FormField;
    className?: string;
}

const FormCheckBox = (props: FormCheckBoxProps) => {
    let { field } = props;

    let path = field.value ? mdiCheckboxMarked : mdiCheckboxBlankOutline;

    let onClick = () => {
        field.callback({ value: !field.value });
    };
    let onKeyPress = (e) => {
        if (e.which === 13) {
            onClick();
        }
    };

    return (
        <div
            className={`form-checkbox ${props.className}`}
            onClick={onClick}
            tabIndex={0}
            onKeyPress={onKeyPress}
        >
            <Icon path={path} color="@#1f1f1f" />
            <span>{field.title}</span>
        </div>
    );
};

export default styled(FormCheckBox)`
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: flex-start;

    & > span{
        font-size: 14px;
        user-select: none;
    }

    & > svg{
        width: 24px;
        height: 24px;
        margin-right: 8px;
    }
`;