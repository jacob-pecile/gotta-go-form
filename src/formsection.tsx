import * as React from 'react';
import { Section, FormType, FormField } from './types/formtypes';
import styled from 'styled-components';
import classNames from 'classnames';

import {
    FormInput,
    FormCheckBox,
    FormDropDown,
    FormCheckBoxList,
    FormRadioButtonList,
    FormTextArea,
    FormDateTime
}
    from './components';


interface FormSectionProps {
    sectionIndex: number;
    section: Section;
    className?: string;
}

export const FormSection = (props: FormSectionProps) => {
    let { section, sectionIndex } = props;

    const renderField = (field: FormField, fieldIndex: number) => {

        if (field.visibility && !field.visibility.isVisible) {
            return null;
        }

        let fieldComponent = {
            [FormType.Custom]: field.customComponent && field.customComponent(field),
            [FormType.Input]: <FormInput key={fieldIndex} field={field} {...field.properties} />,
            [FormType.TextArea]: <FormTextArea key={fieldIndex} field={field} {...field.properties} />,
            [FormType.Checkbox]: <FormCheckBox key={fieldIndex} field={field} />,
            [FormType.DropDown]: <FormDropDown key={fieldIndex} field={field} />,
            [FormType.CheckboxList]: <FormCheckBoxList key={fieldIndex} field={field} />,
            [FormType.RadioButtonList]: <FormRadioButtonList key={fieldIndex} field={field} />,
            [FormType.DateTime]: <FormDateTime key={fieldIndex} field={field} />
        };

        return fieldComponent[field.type];
    };

    let fields = section.fields.map((field, index) =>
        <div key={index} className="field-container">
            {renderField(field, index)}
        </div>
    );

    return (
        <div id={`form-section-${sectionIndex}`} className={classNames(props.className, 'form-section')} >
            <div className="section-title-container" data-testid="section-title-container">
                <span>{section.title}</span>
            </div>
            <div className="form-field-container" data-testid="form-field-container">
                {fields}
            </div>
        </div>
    );
};

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
            
        }
    }

    & > .form-field-container{
        display: flex;
        flex-direction: column;

        & > .field-container{
            margin-bottom: 16px;
        }
    }

`;