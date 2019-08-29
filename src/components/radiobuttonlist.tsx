import * as React from 'react';
import styled from 'styled-components';
import {FormField} from '../types/formtypes';
import classNames from 'classnames';

import Icon from '@mdi/react';
import { mdiRadioboxBlank, mdiRadioboxMarked } from '@mdi/js';

interface FormRadioButtonListProps{
    field: FormField;
    className?: string;
}

const FormRadioButtonList = (props: FormRadioButtonListProps) => {
    let {field} = props;

    let onClick = (value: number | string) => () =>{
        field.callback({value});
    }

    let checkboxes = field.options.map((opt, i) => {        
        let path = field.value === opt.value ? mdiRadioboxMarked : mdiRadioboxBlank;

        return (
            <div key={i} className="radio-button" onClick={onClick(opt.value)}>
                <Icon path={path} color="@#1f1f1f"/>
                <span>{opt.label}</span>
            </div>
        )
    });

    return (
        <div className={classNames('radio-list-container', props.className)}>
            {checkboxes}
        </div>
    );
}

export default styled(FormRadioButtonList)`
    display: flex;
    flex-direction: ${(props: FormRadioButtonListProps) => props.field.properties && props.field.properties.layout === 'horizontal' ? 'row' : 'column'};

    & > .radio-button{
        margin-bottom: 4px;
        margin-right: 16px;
        display: flex;
        align-items: center;
        cursor: pointer;

        & > span{
            font-size: 14px;
            font-family: "Open Sans";
            user-select: none;
        }

        & > svg {
            margin-right: 4px;
            width: 24px;
            height: 24px;
        }
    }
`