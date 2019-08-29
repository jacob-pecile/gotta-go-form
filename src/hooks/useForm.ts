import {useState} from 'react';
import {handleCallback} from './handleCallback';
import { FormDefinition, FormIndex }from '../types/formtypes';

export const useForm = (form: FormDefinition) => {

    const [definition, setDefinition] = useState(form);

    const onCallback = (index: FormIndex, callback: (event: any) => void ) => (event: any) => {
        let field = definition.sections[index.sectionIndex].fields[index.fieldIndex];

        field = handleCallback(field, event);

        setDefinition({...definition});

        callback(event);
    }

    const updateCurrentSection = (sectionNumber: number) => () => {
        let element = document.getElementById(`form-section-${sectionNumber}`);
        element.scrollIntoView();
    }

    return {
        definition,
        onCallback,
        updateCurrentSection
    }
}