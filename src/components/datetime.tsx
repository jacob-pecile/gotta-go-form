import * as React from 'react';
import styled from 'styled-components';
import {FormField} from '../types/formtypes';
import classNames from 'classnames';

const DateTime = require('react-datetime');
import 'react-datetime/css/react-datetime.css';

interface FormDateTimeProps{
    field: FormField;
    className?: string;
}

const FormDateTime = (props: FormDateTimeProps) => {
    let {field} = props;
    let {dateformat, timeformat} = field.properties;

    let placeholder = [dateformat, timeformat].join (' ');

    return (
        <div className={classNames('form-datetime', props.className)}>
            <span>{field.title}</span>
            <DateTime 
                dateFormat={dateformat ? dateformat : false}
                timeFormat={timeformat ? timeformat : false}
                onChange={field.callback}
                value={field.value}
                inputProps={{placeholder: placeholder.toLowerCase()}}
            />
        </div>
    )
}

export default styled(FormDateTime)`
    display: flex;
    flex-direction: column;

    & > span{
        font-size: 14px;
        font-family: "Open Sans";
        font-weight: 600;
    }
`