import {FormField, FormType} from '../types/formtypes';

export const handleCallback = (field: FormField, event: any) =>  {

    const fieldValue = {
        [FormType.Input] : event.target.value
    }

    field.value = fieldValue[field.type];

    return field;
}