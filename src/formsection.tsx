import * as React from 'react';
import {Section, FormType, FormField, FormIndex} from './types/formtypes';
import {FormInput} from './components';
import styled from 'styled-components';
import classNames from 'classnames';

interface FormSectionProps{
    sectionIndex: number;
    section: Section;
    onFieldCallback: (index: FormIndex, callback: (event: any) => void ) => (event: any) => void;
    className?: string;
}

export const FormSection = (props: FormSectionProps) => {
    let {section, onFieldCallback, sectionIndex} = props;

    const renderField = (field: FormField, fieldIndex: number) => {
        field.callback = onFieldCallback({sectionIndex, fieldIndex}, field.callback)

        let fieldComponent = {
            [FormType.Input] : <FormInput key={fieldIndex} field={field} />
        }

        return fieldComponent[field.type];
    };

    let fields = section.fields.map((field, index) =>  renderField(field, index));

    return (
        <div id={`form-section-${sectionIndex}`} className={classNames(props.className, 'form-section')} >
            <div className="section-title-container">
                <span>{section.title}</span>
            </div>
            <div className="form-field-container">
                {fields}
            </div>
        </div>
    )
}

export default styled(FormSection)`
    display: flex;
    flex-direction: column;
    margin: 0px 8px;

    & > .section-title-container{
        border-bottom: 1px solid #1f1f1f;
        margin-bottom: 8px;

        & > span{
            font-weight: 600;
            font-size: 24px;
            font-family: "Open Sans";
        }
    }

    & > .form-field-container{
        display: flex;
        flex-direction: column;
    }

`