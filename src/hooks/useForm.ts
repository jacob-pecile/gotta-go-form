import { useState } from 'react';
import { handleCallback } from './handleCallback';
import { HandleFormValidation } from './handleValidation';
import { FormDefinition, FormIndex } from '../types/formtypes';
import { FooterAction } from '../types/eventtypes';
import { flatten } from 'lodash';

export const useForm = (form: FormDefinition, footerActions: FooterAction[]) => {

    const [definition, setDefinition] = useState(form);

    const onCallback = (index: FormIndex, callback: (event: any) => void) => (event: any) => {
        let field = definition.sections[index.sectionIndex].fields[index.fieldIndex];

        field = handleCallback(field, event);

        setDefinition({ ...definition });

        callback(event);
    };

    const updateCurrentSection = (sectionNumber: number) => () => {
        let element = document.getElementById(`form-section-${sectionNumber}`);
        element.scrollIntoView();
    };

    const ValidateForm = (submitCallback: () => void = null) => () => {
        let validatedForm = HandleFormValidation(definition);
        setDefinition({ ...validatedForm });

        if (submitCallback) {
            let isValid = flatten(validatedForm.sections.map(section => section.fields))
                .filter(field => field.properties && field.properties.InvalidMessage).length === 0;

            if (isValid) {
                submitCallback();
            }
        }
    };

    footerActions = footerActions.map(action => action.validate ?
        {
            ...action,
            onClick: ValidateForm(action.onClick)
        }
        : action
    );

    return {
        definition,
        onCallback,
        updateCurrentSection,
        ValidateForm,
        formfooterActions: footerActions
    };
};