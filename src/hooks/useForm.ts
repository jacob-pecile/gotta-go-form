import { useState, useEffect } from 'react';
import { handleCallback } from './handleCallback';
import { HandleFormValidation } from './handleValidation';
import { FormDefinition, FormIndex, FormField } from '../types/formtypes';
import { FooterAction } from '../types/eventtypes';
import { flatten } from 'lodash';

//TODO: move copied code into common handle form logic file
export const useForm = (form: FormDefinition, footerActions: FooterAction[]) => {

    const [definition, setDefinition] = useState(form);

    let allFields = flatten(definition.sections.map(section => section.fields));

    useEffect(() => {
        definition.sections.forEach((section, sectionIndex) =>  
            section.fields.forEach((field, fieldIndex) => {
                field.callback = onCallback({ sectionIndex, fieldIndex }, field.callback);

                if (field.visibility){
                    let dependentValues = allFields.filter(allField => field.visibility.accessors.indexOf(allField.accessor) >= 0)
                    .sort((a, b) => {
                        let {accessors} = field.visibility;

                        return accessors.indexOf(a.accessor) - accessors.indexOf(b.accessor);
                    })
                    .map(a => a.value)

                    field.visibility.isVisible = field.visibility.condition(...dependentValues)
                }
                
            }
        ));
        setDefinition({ ...definition });
    }, [])

    const onCallback = (index: FormIndex, callback: (event: any) => void) => (event: any) => {
        let field = definition.sections[index.sectionIndex].fields[index.fieldIndex];

        field = handleCallback(field, event);

        allFields.filter(f => f.visibility && f.visibility.accessors.indexOf(field.accessor) >= 0)
        .forEach((visibilityDepenedentField: FormField) => {
            let dependentValues = allFields.filter(allField => visibilityDepenedentField.visibility.accessors.indexOf(allField.accessor) >= 0)
            .sort((a, b) => {
                let {accessors} = visibilityDepenedentField.visibility;

                return accessors.indexOf(a.accessor) - accessors.indexOf(b.accessor);
            })
            .map(a => a.value)

            visibilityDepenedentField.visibility.isVisible = visibilityDepenedentField.visibility.condition(...dependentValues)
        });

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
        updateCurrentSection,
        ValidateForm,
        formfooterActions: footerActions
    };
};