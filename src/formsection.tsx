import * as React from 'react';
import { Section, FormType, FormField } from './types/formtypes';
import styled from 'styled-components';

import {
    FormInput,
    FormCheckBox,
    FormDropDown,
    FormCheckBoxList,
    FormRadioButtonList,
    FormTextArea,
    FormDateTime,
    FormSlider
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

        let fieldComponent = {
            [FormType.Custom]: field.customComponent && field.customComponent(field),
            [FormType.Input]: <FormInput key={fieldIndex} field={field} {...field.properties} />,
            [FormType.TextArea]: <FormTextArea key={fieldIndex} field={field} {...field.properties} />,
            [FormType.Checkbox]: <FormCheckBox key={fieldIndex} field={field} />,
            [FormType.DropDown]: <FormDropDown key={fieldIndex} field={field} />,
            [FormType.CheckboxList]: <FormCheckBoxList key={fieldIndex} field={field} />,
            [FormType.RadioButtonList]: <FormRadioButtonList key={fieldIndex} field={field} />,
            [FormType.DateTime]: <FormDateTime key={fieldIndex} field={field} />,
            [FormType.Slider]: <FormSlider key={fieldIndex} field={field} />
        };

        return fieldComponent[field.type];
    };

    let fields = section.fields
        .filter(field => (!field.visibility || field.visibility.isVisible) && field.callback)
        .map((field, index) =>
            <div key={index} className={`field-container field-${field.accessor}`}
                style={{ width: `calc(${field.fieldWidthPercentage || 100}% - 16px)` }}>
                {renderField(field, index)}
            </div>
        );

    return (
        <div id={`form-section-${sectionIndex}`} className={`${props.className} form-section`} >
            {section.title && <div className="section-title-container" data-testid="section-title-container">
                <span>{section.title}</span>
            </div>}
            <div className="form-field-container" data-testid="form-field-container">
                {fields}
            </div>
        </div>
    );
};

export default styled(FormSection)`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0px 8px;

    & > .section-title-container{
        border-bottom: 1px solid #1f1f1f;
        margin-bottom: 8px;

        & > span{
            font-weight: 600;
            font-size: 16px;
        }
    }

    & > .form-field-container{
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        & > .field-container{
            margin: 8px;
            align-self: center;    
            min-height: 30px;
            align-items: center;
            display: flex;

            & > *{
                flex: 1
            }
        }
    }

`;