import * as React from 'react';
import {FormField} from '../types/formtypes';

interface FormInputProps{
    field: FormField;
}

export const FormInput = (props: FormInputProps) => {
    let {field} = props;

    return (
        <div className="form-input-container">
            <span>{field.title}</span>
            <input onChange={field.callback}/>
        </div>
    )
}