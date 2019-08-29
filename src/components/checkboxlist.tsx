import * as React from 'react';
import styled from 'styled-components';
import {FormField} from '../types/formtypes';
import classNames from 'classnames';

import CheckBox from './checkbox';

interface FormCheckBoxListProps{
    field: FormField;
    className?: string;
}

const CheckBoxList = (props: FormCheckBoxListProps) => {
    let {field} = props;
    let selectedList = field.value;

    let onClick = (value: number | string) => (event: any) =>{

        let selected = event.value;

        if (!selected){
            field.callback(selectedList.filter(val => val != value));
        }
        else
        {
            selectedList.push(value);
            field.callback(selectedList);
        }
    }

    let checkboxes = field.options.map((opt, i) => {
        let selected = selectedList.indexOf(opt.value) >= 0;
        let singleCheckbox = {
            title: opt.label,
            value: selected,
            callback: onClick(opt.value)
        };
        return <CheckBox key={i} field={singleCheckbox}/>
    });

    return (
        <div className={classNames('checkbox-list-container', props.className)}>
            {checkboxes}
        </div>
    );
}

export default styled(CheckBoxList)`
    display: flex;
    flex-direction: ${(props: FormCheckBoxListProps) => props.field.properties && props.field.properties.layout === 'horizontal' ? 'row' : 'column'};

    & > .form-checkbox{
        margin-bottom: 4px;
        margin-right: 16px;

        & > svg {
            margin-right: 4px;
        }
    }
`