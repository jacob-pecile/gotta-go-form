import {FormField, FormType} from '../types/formtypes';

export const handleCallback = (field: FormField, event: any) =>  {

    const fieldValue = {
        [FormType.Input] : () => event.target.value,
        [FormType.Checkbox] : () => event.value,
        [FormType.DropDown] : () => event.value,
        [FormType.CheckboxList] : () => event,
        [FormType.RadioButtonList] : () => event.value
    }

    field.value = fieldValue[field.type]();

    return field;
}