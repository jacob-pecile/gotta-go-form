import * as React from 'react';
import styled from 'styled-components';
import {FormField} from '../types/formtypes';
import classNames from 'classnames';

interface FormInputProps{
    field: FormField;
    className?: string;
}

const FormInput = (props: FormInputProps) => {
    let {field, className} = props;

    return (
        <div className={classNames('form-input-container', className)}>
            <span>{field.title}</span>
            <input onChange={field.callback}/>
        </div>
    )
}

export default styled(FormInput)`
    display: flex;
    flex-direction: column;

    & > span{
        font-size: 14px;
        font-family: "Open Sans"
    }

    & > input {
        margin-top: 4px;
        padding: 8px;
        border-radius: 3px;
        border: 1px solid #1f1f1f;
    }
`;