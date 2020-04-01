import * as React from 'react';
import styled from 'styled-components';
import { FormField } from '../types/formtypes';
import classNames from 'classnames';
import ErrorMessage from './metaForm/errorMessage';

import CheckBox from './checkbox';

interface FormCheckBoxListProps {
    field: FormField;
    className?: string;
}

const CheckBoxList = (props: FormCheckBoxListProps) => {
    let { field } = props;
    let selectedList = field.value;

    let onClick = (value: number | string) => (event: any) => {

        let selected = event.value;

        if (!selected) {
            field.callback(selectedList.filter(val => val != value));
        }
        else {
            selectedList.push(value);
            field.callback(selectedList);
        }
    };

    let checkboxes = field.options.map((opt, i) => {
        let selected = selectedList.indexOf(opt.value) >= 0;
        let singleCheckbox = {
            title: opt.label,
            value: selected,
            callback: onClick(opt.value)
        };
        return <CheckBox key={i} field={singleCheckbox} />
    });

    return (
        <div className={props.className}>
            <div className="checkbox-list-title">
                <span>{field.title}</span>
            </div>
            <div className={classNames('checkbox-list-container')}>
                {checkboxes}
            </div>
            {(field.properties && field.properties.InvalidMessage) &&
                <ErrorMessage message={field.properties.InvalidMessage} />
            }
        </div>
    );
};

export default styled(CheckBoxList)`

    & > .checkbox-list-title {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 4px;

        & > span{
            font-size: 14px;
            font-family: 'Open Sans', sans-serif;
            user-select: none;
            font-weight: 600;
        }
    }

    & > .checkbox-list-container{
        display: flex;
        flex-direction: ${(props: FormCheckBoxListProps) => props.field.properties && props.field.properties.layout === 'horizontal' ? 'row' : 'column'};

        & > .form-checkbox{
            margin-bottom: 4px;
            margin-right: 16px;

            & > svg {
                margin-right: 4px;
            }
        }
    }
`