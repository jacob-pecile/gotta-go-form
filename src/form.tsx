import * as React from 'react'
import {useForm} from './hooks/useForm';
import { FormDefinition } from './types/formtypes';
import {FormSection} from './formSection';

interface FormProps{
    formDefinition: FormDefinition;
}

export const Form = (props: FormProps) => {
    let {formDefinition} = props;
    let {onCallback} = useForm(formDefinition);

    let sections = formDefinition.sections.map((section, sectionIndex) =>(
        <FormSection key={sectionIndex} sectionIndex={sectionIndex} section={section} onFieldCallback={onCallback}/>
    ));

    return (
        <div className="form-container">
            <div className="section-container">
                {sections}
            </div>
        </div>
    );
}