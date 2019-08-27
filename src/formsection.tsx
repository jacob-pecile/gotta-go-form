import * as React from 'react';
import {Section, FormType, FormField, FormIndex} from './types/formtypes';
import {FormInput} from './components';

interface FormSectionProps{
    sectionIndex: number;
    section: Section;
    onFieldCallback: (index: FormIndex, callback: (event: any) => void ) => (event: any) => void;
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
        <div className="form-section">
            {fields}
        </div>
    )
}