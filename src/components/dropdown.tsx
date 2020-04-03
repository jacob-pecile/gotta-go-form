import * as React from 'react';
import styled from 'styled-components';
import { FormField } from '../types/formtypes';
import ErrorMessage from './metaForm/errorMessage';

import Select from 'react-select';

interface FormDropdownProps {
    field: FormField;
    className?: string;
}

const FormDropdown = (props: FormDropdownProps) => {
    let { field, className } = props;


    let valueOption = field.options.filter(opt => opt.value === field.value);

    return (
        <div className={`form-dropdown-container ${className}`}>
            <span>{field.title}</span>
            <Select
                className="form-dropdown"
                options={field.options}
                value={valueOption[0]}
                onChange={field.callback}
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