import * as React from 'react';
import styled from 'styled-components';
import { FormField, FormOptions } from '../types/formtypes';
import ErrorMessage from './metaForm/errorMessage';

import Select from 'react-select';

interface FormDropdownProps {
    field: FormField;
    className?: string;
}

const FormDropdown = (props: FormDropdownProps) => {
    let { field, className } = props;

    const onMultiChange = (values: FormOptions[]) => {
        field.callback({ value: values && values.map(v => v.value) });
    };

    let isMulti = field.properties && field.properties.isMulti;

    let onChange = isMulti ? onMultiChange : field.callback;

    field.value = isMulti && !field.value ? [] : field.value;

    let valueOption = isMulti ?
        field.options.filter(opt => field.value.indexOf(opt.value) >= 0) :
        field.options.filter(opt => opt.value === field.value);

    return (
        <div className={`form-dropdown-container ${className}`} data-testid="form-dropdown-container">
            <span>{field.title}</span>
            <Select
                className="form-dropdown"
                classNamePrefix="dd"
                options={field.options}
                value={valueOption}
                onChange={onChange}
                styles={{
                    control: styles => ({ ...styles, border: '1px solid #1f1f1f' })
                }}
                {...field.properties}
            />
            {(field.properties && field.properties.invalidMessage) &&
                <ErrorMessage message={field.properties.invalidMessage} />
            }
        </div>
    );
};

export default styled(FormDropdown)`
    display: flex;
    flex-direction: column;

    & > span{
        font-size: 14px;
        font-family: 'Open Sans', sans-serif
    }

    & > .form-dropdown{
        margin-top: 4px;
    }
`;